import type { NextAuthConfig } from 'next-auth';
import GitHub from "next-auth/providers/github"

export const authConfig = {
  providers: [GitHub],
  pages: {
    signIn: '/',
    signOut: '/'
  }
} satisfies NextAuthConfig;