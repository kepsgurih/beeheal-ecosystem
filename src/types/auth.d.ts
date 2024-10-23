/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    orgsId?: string
  }
  
  interface Session {
    user: {
      id?: string
      orgsId?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    orgsId?: string
    id?: string
  }
}