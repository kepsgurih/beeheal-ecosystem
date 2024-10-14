import type { NextAuthConfig } from 'next-auth';
import GitHub from "next-auth/providers/github"

export const authConfig = {
  providers: [
    GitHub({
      profile(profile) {
        console.log(profile, 'profile github')
        return {
          ...profile
        }
      }
    })
  ],
  pages: {
    signIn: '/',
    signOut: '/'
  }
} satisfies NextAuthConfig;