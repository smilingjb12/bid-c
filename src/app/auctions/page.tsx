import { auth } from "@/auth";
import { EmptyState } from "@/components/empty-state";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { db } from "@/db/database";
import { items } from "@/db/schema";
import { getUserItems } from "@/queries/items";
import { eq } from "drizzle-orm";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function Auctions() {
  const session = await auth();

  if (!session || !session.user) {
    return <div>Please sign in to view auctions</div>;
  }

  const myItems = await getUserItems(session.user.id!);

  if (myItems.length === 0) {
    return (
      <EmptyState
        title="You have no active auctions"
        subtitle="There are no active auctions yet."
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
    <div className="flex flex-col items-center">
      <Heading className="mb-4">Your Current Auctions</Heading>
      <div>
        <p>You have {myItems.length} items</p>
      </div>
    </div>
  );
}
