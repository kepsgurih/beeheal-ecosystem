import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"
import { authConfig } from "./auth.config"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  callbacks: {
    async jwt({token, user}){
      if(user){
        token.role = user.email === "kepsgurih@gmail.com" ? "admin" : "user"
      }
      return token
    },
    async session({ session, token }) {
      // Tambahkan role ke dalam session
      if (token) {
        session.user.role =token.role as string | undefined;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig
})