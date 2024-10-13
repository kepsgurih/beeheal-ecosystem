import type { NextAuthConfig } from 'next-auth';
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const authConfig = {
  providers: [
    GitHub,
  ],
  pages: {
    signIn: '/',
    signOut: '/'
  }
} satisfies NextAuthConfig;