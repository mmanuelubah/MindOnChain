// Vercel Routing Middleware: locked writing needs an access code approved by the owner.
//
// The check runs on Vercel's servers before the page is sent, so locked writing never
// reaches a browser without a valid session. How a session is earned: api/access/*.
//
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   ACCESS_SECRET   at least 32 random characters; signs every token (required)
//   RESEND_API_KEY  sends the approval email to the owner (required for requests)
// Without ACCESS_SECRET every locked page stays locked.
//
// To lock new writing: put it in content/blog/locked/ (its address starts /blog/locked/).
// The two older guides below are listed by address because they live in the database.
import { SESSION_COOKIE, unsign, readCookie, secretOrNull } from "./api/_lib/access.mjs";

export const config = {
  matcher: [
    "/blog/locked/:path*",
    "/alltech/database/guides/me75-full-flash-bdm/:path*",
    "/alltech/database/guides/bosch-me75-manual/:path*",
  ],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  if (url.pathname === "/blog/locked/" || url.pathname === "/blog/locked/index.html") return; // the list of locked titles is public

  const secret = secretOrNull();
  if (secret && (await unsign(secret, readCookie(request, SESSION_COOKIE)))) return; // no response = Vercel serves the page

  const lock = new URL("/locked/", url);
  lock.searchParams.set("next", url.pathname.replace(/index\.html$/, ""));
  return Response.redirect(lock, 302);
}
