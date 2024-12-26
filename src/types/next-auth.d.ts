// src/types/next-auth.d.ts

// Extend the default session type in NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;  // Add id to session.user
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Extend the JWT type in NextAuth
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;  // Add id to JWT
  }
}
