// GET  /api/access/approve?t=…&s=…   shows the request (safe for email link scanners: nothing happens)
// POST /api/access/approve           the owner presses Approve: shows the one-time code to send
// The link is only ever emailed to the owner; its second signature cannot be made from the reader's cookie.
import { approveSig, codeFor, unsign, sameString, escapeHtml, secretOrNull } from "../_lib/access.mjs";

function page(title, inner, status = 200) {
  return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>${title} | Alltech Solutions</title>
<style>body{margin:0;background:#0B1510;color:#E2F5E9;font:17px/1.55 system-ui,sans-serif}main{max-width:36rem;margin:0 auto;padding:32px 16px}
h1{font-size:1.6rem;margin:0 0 12px}.box{border:3px solid #4ADE80;padding:20px;margin:20px 0}.code{font:700 2.4rem/1.1 ui-monospace,monospace;letter-spacing:.08em;color:#39FF88}
button,.btn{display:inline-flex;align-items:center;min-height:48px;padding:0 20px;border:3px solid #4ADE80;background:#4ADE80;color:#0B1510;font:800 1rem system-ui;text-decoration:none;cursor:pointer;margin:4px 8px 4px 0}
.btn.alt{background:transparent;color:#E2F5E9}a{color:#86EFAC}small{color:#A7B4C6}</style><main>${inner}</main></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" } });
}

async function check(t, s) {
  const secret = secretOrNull();
  if (!secret || !t || !s) return null;
  if (!sameString(await approveSig(secret, t), s)) return null;
  const req = await unsign(secret, t);
  return req ? { secret, req } : null;
}

const invalid = () => page("Link not valid", "<h1>This approval link is not valid</h1><p>It may have expired (links last 24 hours) or been changed. The reader can send a new request.</p>", 400);

export async function GET(request) {
  const url = new URL(request.url);
  const t = url.searchParams.get("t"), s = url.searchParams.get("s");
  const ok = await check(t, s);
  if (!ok) return invalid();
  const { req } = ok;
  return page("Approve access", `<h1>Approve access?</h1>
<div class="box"><p><strong>${escapeHtml(req.name)}</strong><br>${escapeHtml(req.email)}</p><p>Wants to read <a href="${escapeHtml(req.path)}">${escapeHtml(req.path)}</a></p></div>
<form method="post" action="/api/access/approve"><input type="hidden" name="t" value="${escapeHtml(t)}"><input type="hidden" name="s" value="${escapeHtml(s)}">
<button type="submit">Approve and show the code</button></form><p><small>To refuse, close this page. Nothing is sent until you approve.</small></p>`);
}

export async function POST(request) {
  const form = await request.formData().catch(() => null);
  const ok = form && (await check(form.get("t"), form.get("s")));
  if (!ok) return invalid();
  const { secret, req } = ok;
  const code = await codeFor(secret, req.rid);
  const until = new Date(req.exp).toLocaleString("en-NG", { timeZone: "Africa/Lagos", dateStyle: "medium", timeStyle: "short" });
  const message = `Hello ${req.name}, your Alltech access code is ${code}. Enter it on the page where you asked for access. It works once, on that device, until ${until} (Lagos time).`;
  const mail = `mailto:${encodeURIComponent(req.email)}?subject=${encodeURIComponent("Your Alltech access code")}&body=${encodeURIComponent(message)}`;
  return page("Access code", `<h1>Approved</h1><p>Send this code to ${escapeHtml(req.name)}:</p>
<div class="box"><p class="code">${code}</p><small>Valid for this request only, until ${escapeHtml(until)} Lagos time.</small></div>
<a class="btn" href="${escapeHtml(mail)}">Email it to ${escapeHtml(req.email)}</a>`);
}
