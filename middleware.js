// Vercel Routing Middleware: real password protection for private guides.
//
// The check runs on Vercel's servers before the page is sent, so the guide
// never reaches a browser without the password. (The old in-page gate sent the
// whole guide to everyone and only hid it.)
//
// Password: set GUIDES_PASSWORD in Vercel > Project > Settings > Environment
// Variables. Any username works. If the variable is missing, access is refused.
//
// To protect another page: add `private: true` to its front matter AND add its
// path below. Vercel needs the list written out here; it cannot read Hugo files.
export const config = {
  matcher: [
    "/alltech/database/guides/me75-full-flash-bdm/:path*",
    "/alltech/database/guides/bosch-me75-manual/:path*",
  ],
};

export default function middleware(request) {
  const expected = process.env.GUIDES_PASSWORD;
  if (!expected) {
    return new Response("This guide is private and not available right now.", { status: 503 });
  }

  const header = request.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const decoded = atob(encoded);
    const password = decoded.slice(decoded.indexOf(":") + 1);
    if (password === expected) return; // no response = Vercel serves the page
  }

  return new Response("This guide is private. Ask Emmanuel for access on WhatsApp.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Alltech private guides", charset="UTF-8"' },
  });
}
