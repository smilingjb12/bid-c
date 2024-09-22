import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db/database";
import { users, accounts, sessions, verificationTokens } from "./db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
