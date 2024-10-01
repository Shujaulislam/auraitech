import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password", placeholder: "123456" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
        if (
          credentials?.username === "admin" &&
          credentials?.password === "123456"
        ) {
          return { id: "1", name: "Admin User" };
        }
        return null;
      }
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
