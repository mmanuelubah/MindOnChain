// POST /api/access/request  {name, email, reason, next}
// Emails the owner an approval link and gives the reader a pending-request cookie.
import { OWNER_EMAIL, REQUEST_TTL_MS, PENDING_COOKIE, sign, approveSig, newRid, cookie, safePath, escapeHtml, json, secretOrNull } from "../_lib/access.mjs";

const EMAIL_RE = /^[^\s@<>]{1,64}@[^\s@<>]{1,190}\.[A-Za-z]{2,}$/;

export async function POST(request) {
  const secret = secretOrNull();
  const resendKey = process.env.RESEND_API_KEY;
  if (!secret || !resendKey) {
    return json(503, { error: "Requests are switched off right now. Ask Emmanuel on WhatsApp instead." });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "That request could not be read. Please try again." });
  }
  const name = String(body.name || "").trim().slice(0, 80);
  const email = String(body.email || "").trim().toLowerCase();
  const reason = String(body.reason || "").trim().slice(0, 500);
  const path = safePath(body.next);
  if (!name) return json(422, { field: "name", error: "Please add your name." });
  if (!EMAIL_RE.test(email)) return json(422, { field: "email", error: "Please check your email address." });

  const now = Date.now();
  const token = await sign(secret, { rid: newRid(), email, name, path, exp: now + REQUEST_TTL_MS });
  const origin = new URL(request.url).origin;
  const approveUrl = `${origin}/api/access/approve?t=${encodeURIComponent(token)}&s=${encodeURIComponent(await approveSig(secret, token))}`;

  const html = `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) asked to read <a href="${origin}${escapeHtml(path)}">${escapeHtml(path)}</a>.</p>
${reason ? `<p>Their reason: ${escapeHtml(reason)}</p>` : ""}
<p><a href="${approveUrl}">Review and approve</a></p>
<p>Ignore this email to refuse. The link expires in 24 hours.</p>`;

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.ACCESS_FROM || "Alltech Solutions <onboarding@resend.dev>",
      to: [OWNER_EMAIL],
      reply_to: email,
      subject: `Access request: ${name} wants to read ${path}`,
      html,
    }),
  }).catch(() => null);

  if (!sent || !sent.ok) {
    return json(502, { error: "The request could not be sent. Please try again in a minute, or ask on WhatsApp." });
  }
  return json(200, { ok: true }, [cookie(PENDING_COOKIE, token, REQUEST_TTL_MS / 1000)]);
}
