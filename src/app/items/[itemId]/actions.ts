"use server";

import { auth } from "@/auth";
import { db } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBidAction(itemId: number) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await db.transaction(async (tx) => {
    const item = await tx.query.items.findFirst({
      where: eq(items.id, itemId),
    });

    if (!item) {
      throw new Error("Item not found");
    }

    const latestPrice = Number(item.currentPrice) + Number(item.bidInterval);

    await tx.insert(bids).values({
      amount: latestPrice.toFixed(2),
      itemId,
      userId: session!.user!.id!,
      timestamp: new Date(),
    });

    await tx
      .update(items)
      .set({ currentPrice: latestPrice.toFixed(2) })
      .where(eq(items.id, itemId));

    return latestPrice;
  });

  revalidatePath(`/items/${itemId}`);
}
