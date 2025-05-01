// src/pages/api/auth/[...nextauth].ts

import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // TEMP: always return user for now (no real password check)
        if (user) {
          return { id: user.id, email: user.email };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

authorize: async (credentials) => {
  const user = await prisma.user.findUnique({
    where: { email: credentials?.email },
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(credentials?.password || "", user.hashedPassword);
  if (!isValid) return null;

  return { id: user.id, email: user.email };
}