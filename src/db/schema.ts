import { sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  startingPrice: decimal("startingPrice", {
    precision: 10,
    scale: 2,
  }).notNull(),
  currentPrice: decimal("currentPrice", {
    precision: 10,
    scale: 2,
  })
    .notNull()
    .default("0.00"),
  fileKey: text("fileKey").notNull(),
  bidInterval: decimal("bidInterval").notNull().default("1.00"),
});

export const bids = pgTable("bids", {
  id: serial("id").primaryKey(),
  amount: decimal("amount", {
    precision: 10,
    scale: 2,
  })
    .notNull()
    .default("0.00"),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  timestamp: timestamp("timestamp")
    .notNull()
    .default(sql`now()`),
});

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export type Item = typeof items.$inferSelect;
export type Bid = typeof bids.$inferSelect;
