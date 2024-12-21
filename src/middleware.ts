// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import type { NextRequest } from "next/server";

// // Define your secret key
// const secret = process.env.JWT_SECRET || "your_jwt_secret_key";

// export async function middleware(req: NextRequest) {
//   console.log("middlreq-", req.url);
//   const token = await getToken({
//     req: {
//       cookies: Object.fromEntries(req.cookies),
//       headers: Object.fromEntries(req.headers),
//       body: null,
//       method: req.method,
//       query: {},
//     } as any, // Temporary cast to avoid TypeScript errors
//     secret,
//     secureCookie: process.env.NODE_ENV === "production",
//   });

//   const { pathname } = req.nextUrl;

//   // Allow access to public routes or if user is authenticated
//   if (
//     token || 
//     pathname.startsWith("/api/auth") || 
//     pathname === "/" || 
//     pathname.startsWith("/login") // Don't redirect if already on login page
//   ) {
//     return NextResponse.next();
//   }

//   // Redirect unauthenticated users to the login page
//   const loginUrl = new URL("/login", req.url);
//   return NextResponse.redirect(loginUrl);
// }

// // Apply middleware to specific routes
// export const config = {
//   matcher: ["/dashboardjobseeker/:path*", "/api/user/:path*"],
// };
