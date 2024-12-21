import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt"; // Import JWT type

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) { // Check if session.user is defined
        session.user.id = token.id as string; // Add custom user id from JWT token
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Correct session strategy (should be 'jwt')
  },
};

export default NextAuth(authOptions);
