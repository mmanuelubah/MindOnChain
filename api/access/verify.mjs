// POST /api/access/verify  {code}
// Checks the code against this browser's pending request and starts a one-hour session.
import { PENDING_COOKIE, SESSION_COOKIE, SESSION_TTL_MS, unsign, codeFor, normaliseCode, sameString, readCookie, cookie, sign, json, secretOrNull } from "../_lib/access.mjs";

export async function POST(request) {
  const secret = secretOrNull();
  if (!secret) return json(503, { error: "Access is switched off right now. Ask Emmanuel on WhatsApp." });

  const req = await unsign(secret, readCookie(request, PENDING_COOKIE));
  if (!req) {
    return json(409, { error: "There is no open request on this device, or it has expired. Please request access again." });
  }
  let body = {};
  try { body = await request.json(); } catch {}
  const code = normaliseCode(body.code);
  if (!code) return json(422, { field: "code", error: "Codes have 8 characters, like 7K2P-Q9XD." });
  if (!sameString(code, await codeFor(secret, req.rid))) {
    return json(422, { field: "code", error: "That code doesn't match this request. Check it, or request a new one." });
  }

  const session = await sign(secret, { email: req.email, exp: Date.now() + SESSION_TTL_MS });
  return json(200, { ok: true, next: req.path }, [cookie(SESSION_COOKIE, session, SESSION_TTL_MS / 1000), cookie(PENDING_COOKIE, "", 0)]);
}
