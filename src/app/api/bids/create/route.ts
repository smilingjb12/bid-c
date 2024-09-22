import { auth } from "@/auth";
import { db } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const url = new URL(req.url);
  const itemId = Number(url.searchParams.get("itemId"));

  await db.transaction(async (tx) => {
    const item = await tx.query.items.findFirst({
      where: eq(items.id, itemId),
    });

    if (!item) {
      throw new Error("Item not found");
    }

    try {
      const latestPrice = Number(item.currentPrice) + Number(item.bidInterval);
      console.log("latestPrice", latestPrice);

      await tx.insert(bids).values({
        amount: latestPrice.toFixed(2),
        itemId,
        userId: session!.user!.id!,
        timestamp: new Date(),
      });

      const y = await tx
        .update(items)
        .set({ currentPrice: latestPrice.toFixed(2) })
        .where(eq(items.id, itemId));
      console.log("YEAH:", y);
    } catch (e) {
      console.error("OH NO:", e);
    }
  });
  return NextResponse.json({ success: true }, { status: 200 });
}
