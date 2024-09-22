import { db } from "@/db/database";
import { bids as bidsTable, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export type BidHistoryItem = {
  id: number;
  amount: string;
  userName: string | null;
  timestamp: Date;
};

export const getBidHistoryItems = async (
  itemId: number
): Promise<BidHistoryItem[]> => {
  const bids: BidHistoryItem[] = await db
    .select({
      id: bidsTable.id,
      amount: bidsTable.amount,
      timestamp: bidsTable.timestamp,
      userName: users.name,
    })
    .from(bidsTable)
    .innerJoin(users, eq(bidsTable.userId, users.id))
    .where(eq(bidsTable.itemId, Number(itemId)))
    .orderBy(desc(bidsTable.timestamp));

  return bids;
};
