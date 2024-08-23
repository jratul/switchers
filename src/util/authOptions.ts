import { AuthOptions } from "next-auth";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/util/database";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "required",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const user = await res.json();
          return user || null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = {};
        token.user.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: MongoDBAdapter(connectDB),
};
