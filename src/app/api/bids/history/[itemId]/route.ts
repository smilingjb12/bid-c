import { getBidHistoryItems } from "@/queries/bids";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { itemId: string } }
) {
  const bidHistory = await getBidHistoryItems(Number(params.itemId));
  return NextResponse.json(bidHistory);
}
