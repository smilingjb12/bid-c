import { getItem } from "@/queries/items";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  const { itemId } = params;
  const item = await getItem(Number(itemId));
  return NextResponse.json(item);
}
