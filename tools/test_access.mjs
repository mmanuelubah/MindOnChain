// End-to-end test of the locked-writing flow, run locally with Node (no Vercel needed):
//   node tools/test_access.mjs
// Uses the real middleware and /api/access handlers; only the email service is faked.
import assert from "node:assert/strict";

process.env.ACCESS_SECRET = "test-secret-that-is-at-least-32-characters-long";
process.env.RESEND_API_KEY = "test-key";

const sent = [];
globalThis.fetch = async (url, init) => {
  assert.equal(url, "https://api.resend.com/emails");
  sent.push(JSON.parse(init.body));
  return new Response("{}", { status: 200 });
};

const { default: middleware } = await import("../middleware.js");
const request = await import("../api/access/request.mjs");
const approve = await import("../api/access/approve.mjs");
const verify = await import("../api/access/verify.mjs");
const refresh = await import("../api/access/refresh.mjs");
const lib = await import("../api/_lib/access.mjs");

const SITE = "https://alltech.example";
const LOCKED = "/alltech/database/guides/me75-full-flash-bdm/";
const cookieOf = (res, name) => res.headers.getSetCookie().map((c) => c.split(";")[0]).find((c) => c.startsWith(name + "="));
const post = (path, body, cookie) => new Request(SITE + path, { method: "POST", headers: { "content-type": "application/json", ...(cookie ? { cookie } : {}) }, body: JSON.stringify(body) });
let pass = 0;
const ok = (name) => { pass++; console.log("  ok", name); };

// 1. No session: locked page redirects to /locked/
let r = await middleware(new Request(SITE + LOCKED));
assert.equal(r.status, 302);
assert.equal(new URL(r.headers.get("location")).pathname, "/locked/");
assert.equal(new URL(r.headers.get("location")).searchParams.get("next"), LOCKED);
ok("locked page without a session redirects to /locked/?next=…");

r = await middleware(new Request(SITE + LOCKED + "index.html"));
assert.equal(r.status, 302);
ok("…including the direct index.html address");

// 2. Bad input is refused with a field-level message
r = await request.POST(post("/api/access/request", { name: "Ada", email: "not-an-email", next: LOCKED }));
assert.equal(r.status, 422);
assert.equal((await r.json()).field, "email");
ok("invalid email refused, error points at the email field");

// 3. A valid request emails only the owner and sets a pending cookie
r = await request.POST(post("/api/access/request", { name: "Ada <b>", email: "Ada@Example.com", reason: "E46 job", next: LOCKED }));
assert.equal(r.status, 200);
const pending = cookieOf(r, lib.PENDING_COOKIE);
assert.ok(pending);
assert.equal(sent.length, 1);
assert.deepEqual(sent[0].to, ["ubanatuchinaza@gmail.com"]);
assert.ok(!sent[0].html.includes("<b>"), "names are HTML-escaped in the email");
ok("request emails only ubanatuchinaza@gmail.com, escapes HTML, sets pending cookie");

// 4. The reader cannot approve themselves: their cookie is not a valid approve link
const token = decodeURIComponent(pending.split("=")[1]);
r = await approve.GET(new Request(`${SITE}/api/access/approve?t=${encodeURIComponent(token)}&s=forged`));
assert.equal(r.status, 400);
ok("forged approval signature refused");

// 5. Owner opens the emailed link (GET shows details only), then approves (POST shows the code)
const link = new URL(sent[0].html.match(/href="([^"]+approve[^"]+)"/)[1].replace(/&amp;/g, "&"));
r = await approve.GET(new Request(link));
assert.equal(r.status, 200);
assert.ok(!/[0-9A-Z]{4}-[0-9A-Z]{4}/.test(await r.text()), "GET must not reveal the code (email link scanners open links)");
ok("approval link shows the request but not the code");

const form = new FormData();
form.set("t", link.searchParams.get("t"));
form.set("s", link.searchParams.get("s"));
r = await approve.POST(new Request(SITE + "/api/access/approve", { method: "POST", body: form }));
const code = (await r.text()).match(/class="code">([0-9A-Z]{4}-[0-9A-Z]{4})</)[1];
ok("owner approval produces code " + code);

// 6. Wrong code refused; code without the pending cookie refused
r = await verify.POST(post("/api/access/verify", { code: "0000-0000" }, pending));
assert.equal(r.status, 422);
r = await verify.POST(post("/api/access/verify", { code }));
assert.equal(r.status, 409);
ok("wrong code refused; right code from another device refused");

// 7. Right code (typed lower case, no dash) opens a session
r = await verify.POST(post("/api/access/verify", { code: code.replace("-", "").toLowerCase() }, pending));
assert.equal(r.status, 200);
assert.equal((await r.json()).next, LOCKED);
const session = cookieOf(r, lib.SESSION_COOKIE);
assert.ok(session);
assert.match(r.headers.getSetCookie().join("\n"), /alltech_pending=; .*Max-Age=0/);
assert.match(r.headers.getSetCookie().join("\n"), /alltech_access=.*Max-Age=3600; HttpOnly; Secure; SameSite=Lax/);
ok("right code (any case, no dash) opens a one-hour HttpOnly session and clears the request");

// 8. With the session the locked page is served
r = await middleware(new Request(SITE + LOCKED, { headers: { cookie: session } }));
assert.equal(r, undefined);
ok("valid session: middleware lets the page through");

// 9. Every new request gets a different code
await request.POST(post("/api/access/request", { name: "Ada", email: "ada@example.com", next: LOCKED }));
const link2 = new URL(sent[1].html.match(/href="([^"]+approve[^"]+)"/)[1].replace(/&amp;/g, "&"));
const form2 = new FormData(); form2.set("t", link2.searchParams.get("t")); form2.set("s", link2.searchParams.get("s"));
const code2 = (await (await approve.POST(new Request(SITE + "/api/access/approve", { method: "POST", body: form2 }))).text()).match(/class="code">([0-9A-Z-]{9})</)[1];
assert.notEqual(code2, code);
ok("a second request gets a different code (" + code2 + ")");

// 10. Tampered and expired sessions are refused
const [body, sig] = decodeURIComponent(session.split("=")[1]).split(".");
const forgedBody = Buffer.from(JSON.stringify({ email: "x@y.z", exp: Date.now() + 9e9 })).toString("base64url");
r = await middleware(new Request(SITE + LOCKED, { headers: { cookie: `${lib.SESSION_COOKIE}=${forgedBody}.${sig}` } }));
assert.equal(r.status, 302);
const expired = await lib.sign(process.env.ACCESS_SECRET, { email: "ada@example.com", exp: Date.now() - 1 });
r = await middleware(new Request(SITE + LOCKED, { headers: { cookie: `${lib.SESSION_COOKIE}=${encodeURIComponent(expired)}` } }));
assert.equal(r.status, 302);
ok("tampered session refused; session expired after an hour refused");

// 11. Refresh renews a live session and reports a dead one
r = await refresh.POST(new Request(SITE + "/api/access/refresh", { method: "POST", headers: { cookie: session } }));
assert.equal(r.status, 200);
r = await refresh.POST(new Request(SITE + "/api/access/refresh", { method: "POST", headers: { cookie: `${lib.SESSION_COOKIE}=${encodeURIComponent(expired)}` } }));
assert.equal(r.status, 401);
ok("refresh renews a live session, returns 401 for an expired one");

// 12. Without ACCESS_SECRET everything stays locked
delete process.env.ACCESS_SECRET;
r = await middleware(new Request(SITE + LOCKED, { headers: { cookie: session } }));
assert.equal(r.status, 302);
r = await request.POST(post("/api/access/request", { name: "Ada", email: "ada@example.com", next: LOCKED }));
assert.equal(r.status, 503);
ok("missing ACCESS_SECRET: pages stay locked, requests switched off");

// 13. Redirect target is always a same-site path
assert.equal(lib.safePath("//evil.example/x"), "/blog/");
assert.equal(lib.safePath("https://evil.example"), "/blog/");
assert.equal(lib.safePath("/blog/locked/x/"), "/blog/locked/x/");
ok("next= only accepts same-site paths");

console.log(`\n${pass} checks passed`);
