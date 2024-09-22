import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { getBidHistoryItems } from "@/queries/bids";
import { getItem } from "@/queries/items";
import Link from "next/link";
import { ItemsDetails } from "./items-details";

const ItemPage = async ({
  params: { itemId },
}: {
  params: { itemId: string };
}) => {
  const item = await getItem(Number(itemId));
  const bids = await getBidHistoryItems(Number(itemId));

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Heading>Item not found</Heading>
        <p>The item you&apos;re looking for is not found</p>
        <Button asChild>
          <Link href={`/`}>View Auctions</Link>
        </Button>
      </div>
    );
  }

  return <ItemsDetails item={item} bids={bids} />;
};

export default ItemPage;
