import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]"; // Adjust the path to where your auth options are located
import type { NextRequest } from "next/server";

// Define your secret key
// const secret = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function middleware(req: NextRequest) {
  console.log("middlreq-", req.url);

  // Get the session using getServerSession
  // const session = await getServerSession(req, authOptions);

  const { pathname } = req.nextUrl;

  // Allow access to public routes or if user is authenticated
  if (
   
    pathname.startsWith("/api/auth") ||
    pathname === "/" ||
    pathname.startsWith("/login") // Don't redirect if already on login page
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page
  const loginUrl = new URL("/login", req.url);
  return NextResponse.redirect(loginUrl);
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/dashboardjobseeker/:path*", "/api/user/:path*"],
};
