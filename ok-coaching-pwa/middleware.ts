import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

interface CustomToken {
  user?: {
    role?: string;
  };
}

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as CustomToken | null;

    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!token || token.user?.role !== "admin") {
        console.log("User token:", token);
        console.log("User role:", token?.user?.role);
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile-setup"],
};