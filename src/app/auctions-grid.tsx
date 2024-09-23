import { auth } from "@/auth";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { getItems } from "@/queries/items";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ItemCard } from "./item-card";

export const AuctionsGrid = async () => {
  const session = await auth();
  const allItems = await getItems();

  if (allItems.length === 0) {
    return (
      <EmptyState
        title="No auctions yet"
        subtitle="There are currently no active auctions. Be the first to create one
            and start bidding!"
        actionButton={
          <Button className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            <Link href="/items/create">Create New Auction</Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {allItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              canView={!!session?.user?.id}
              canPlaceBid={item.userId !== session?.user?.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
