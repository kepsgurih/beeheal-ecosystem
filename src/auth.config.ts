import type { NextAuthConfig } from 'next-auth'
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const authConfig = {
  providers: [
    GitHub,
    Google
  ],
  pages: {
    signIn: '/',
    signOut: '/'
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Saat user pertama kali sign in, user object akan tersedia
      if (user) {
        token.orgsId = user.orgsId
        token.id = user.id
      }

      // Handle update session
      if (trigger === "update" && session?.orgsId) {
        token.orgsId = session.orgsId
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.orgsId = token.orgsId
        session.user.id = token.id
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Pastikan user memiliki orgsId saat pertama kali sign in
          if (!user.orgsId) {
            user.orgsId = ""
          }
          return true
        } catch (error) {
          console.error("Error in signIn callback:", error)
          return false
        }
      }
      return true
    }
  },
} satisfies NextAuthConfig