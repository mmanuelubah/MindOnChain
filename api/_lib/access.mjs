// Access codes for locked writing. Shared by middleware.js and the /api/access/* functions.
//
// No database: every token is JSON signed with HMAC-SHA256 using ACCESS_SECRET
// (a Vercel environment variable). Tampering with a token breaks the signature.
//
//   request token   {rid, email, name, path, exp}   cookie on the reader's browser
//   approve link    request token + HMAC("approve|" + token)   emailed to the owner only
//   access code     8 characters derived from HMAC("code|" + rid): new for every request
//   session token   {email, exp}   cookie, valid 1 hour, renewed while the page is open

export const OWNER_EMAIL = "ubanatuchinaza@gmail.com"; // the only address that can approve (owner decision)
export const REQUEST_TTL_MS = 24 * 60 * 60 * 1000;      // a request and its code expire after 24 hours
export const SESSION_TTL_MS = 60 * 60 * 1000;           // locked again after an hour away
export const PENDING_COOKIE = "alltech_pending";
export const SESSION_COOKIE = "alltech_access";

const enc = new TextEncoder();
// Crockford base32 without I, L, O, U: codes read aloud or typed from WhatsApp can't be misread.
const CODE_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function b64url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(str) {
  const s = atob(str.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
}

async function key(secret) {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
async function hmac(secret, text) {
  return new Uint8Array(await crypto.subtle.sign("HMAC", await key(secret), enc.encode(text)));
}

export async function sign(secret, payload) {
  const body = b64url(enc.encode(JSON.stringify(payload)));
  return body + "." + b64url(await hmac(secret, body));
}

// Returns the payload, or null if the signature is wrong, the token is malformed or it has expired.
export async function unsign(secret, token, now = Date.now()) {
  if (typeof token !== "string" || token.length > 2000) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  let ok = false;
  try {
    ok = await crypto.subtle.verify("HMAC", await key(secret), fromB64url(sig), enc.encode(body)); // constant time
  } catch {
    return null;
  }
  if (!ok) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(fromB64url(body)));
    return typeof payload.exp === "number" && payload.exp > now ? payload : null;
  } catch {
    return null;
  }
}

export async function approveSig(secret, requestToken) {
  return b64url(await hmac(secret, "approve|" + requestToken));
}

export async function codeFor(secret, rid) {
  const mac = await hmac(secret, "code|" + rid);
  let code = "";
  for (let i = 0; i < 8; i++) code += CODE_ALPHABET[mac[i] % 32];
  return code.slice(0, 4) + "-" + code.slice(4);
}

// Accepts "abcd efgh", "ABCD-EFGH", and the letters people confuse with digits.
export function normaliseCode(input) {
  const s = String(input || "").toUpperCase().replace(/[\s-]/g, "").replace(/[IL]/g, "1").replace(/O/g, "0");
  return s.length === 8 ? s.slice(0, 4) + "-" + s.slice(4) : null;
}

export function sameString(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function newRid() {
  return b64url(crypto.getRandomValues(new Uint8Array(16)));
}

export function readCookie(request, name) {
  const header = request.headers.get("cookie") || "";
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

export function cookie(name, value, maxAgeSeconds) {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; Secure; SameSite=Lax`;
}

// Only same-site paths may be returned to; anything else falls back to the blog.
export function safePath(p) {
  return typeof p === "string" && /^\/[A-Za-z0-9._~\-\/]*$/.test(p) && !p.startsWith("//") ? p : "/blog/";
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// `cookies` is a list: each Set-Cookie must be its own header, never comma-joined.
export function json(status, body, cookies = []) {
  const headers = new Headers({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  for (const c of cookies) headers.append("set-cookie", c);
  return new Response(JSON.stringify(body), { status, headers });
}

export function secretOrNull() {
  const s = process.env.ACCESS_SECRET;
  return s && s.length >= 32 ? s : null;
}
