import { db } from "@/db/database";
import { Item, items } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getItem = async (itemId: number): Promise<Item | undefined> => {
  const item = await db.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  return item;
};

export const getItems = async (): Promise<Item[]> => {
  return await db.select().from(items);
};

export const getUserItems = async (userId: string): Promise<Item[]> => {
  return await db.select().from(items).where(eq(items.userId, userId));
};
