// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compareSync } from "bcrypt-ts";
import { LoginSchema } from "@/lib/zod";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const { auth, signIn, signOut, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const validated = LoginSchema.safeParse(credentials);
          if (!validated.success) return null;
          
          const { email, password } = validated.data;
          const user = await prisma.user.findUnique({ where: { email } });
          
          if (!user || !user.password) return null;
          
          const valid = compareSync(password, user.password);
          return valid ? user : null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.birthDate = user.birthDate;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.birthDate = token.birthDate as Date;
      }
      return session;
    },
  },
  
  pages: {
    signIn: "/login",
  },
  
  debug: process.env.NODE_ENV === "development",
});