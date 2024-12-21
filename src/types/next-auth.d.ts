// src/types/next-auth.d.ts

import NextAuth from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

// Extend the default session type
declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // Add id to session.user
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Add id to JWT
  }
}
