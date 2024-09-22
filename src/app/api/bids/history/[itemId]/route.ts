import { getBidHistoryItems } from "@/queries/bids";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  const bidHistory = await getBidHistoryItems(Number(params.itemId));
  return NextResponse.json(bidHistory);
}
