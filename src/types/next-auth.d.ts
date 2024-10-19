import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend default user and session types
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // Add role to User type
  }

  interface Session {
    user: {
      role?: string; // Add role to Session user type
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // Add role to JWT token
  }
}