// POST /api/access/refresh
// Called every few minutes by a locked page while it is open and visible. Renews the
// one-hour session, so access only ends after an hour away.
import { SESSION_COOKIE, SESSION_TTL_MS, unsign, readCookie, cookie, sign, json, secretOrNull } from "../_lib/access.mjs";

export async function POST(request) {
  const secret = secretOrNull();
  const session = secret && (await unsign(secret, readCookie(request, SESSION_COOKIE)));
  if (!session) return json(401, { error: "locked" });
  const renewed = await sign(secret, { email: session.email, exp: Date.now() + SESSION_TTL_MS });
  return json(200, { ok: true }, [cookie(SESSION_COOKIE, renewed, SESSION_TTL_MS / 1000)]);
}
