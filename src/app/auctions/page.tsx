import { auth } from "@/auth";
import { EmptyState } from "@/components/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserItems } from "@/queries/items";
import { ClockIcon, DollarSignIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "../../lib/utils";

export default async function Auctions() {
  const session = await auth();

  if (!session || !session.user) {
    return <div>Please sign in to view auctions</div>;
  }

  const myItems = await getUserItems(session.user.id!);
  const totalCurrentPrice = myItems.reduce(
    (total, item) => total + Number(item.currentPrice),
    0
  );

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Auctions</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myItems.map((auction) => (
              <Card key={auction.id}>
                <CardHeader>
                  <CardTitle>{auction.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-[400px] mb-4">
                    <Image
                      src={getImageUrl(auction.fileKey)}
                      alt={auction.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Start Price
                      </span>
                      <Badge variant="secondary">
                        <DollarSignIcon className="w-4 h-4 mr-1" />
                        {auction.startingPrice}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Current Price
                      </span>
                      <Badge variant="default">
                        <DollarSignIcon className="w-4 h-4 mr-1" />
                        {auction.currentPrice}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Expires in
                      </span>
                      <Badge variant="outline">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {"3 days"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="lg:w-1/4">
          <Card className="sticky top-[80px]">
            <CardHeader>
              <CardTitle>Totals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Current Prices</h3>
                  <div className="space-y-2">
                    {myItems.map((auction) => (
                      <div
                        key={`current-${auction.id}`}
                        className="flex justify-between"
                      >
                        <span className="text-sm text-muted-foreground">
                          {auction.name}
                        </span>
                        <Badge variant="default">
                          <DollarSignIcon className="w-4 h-4 mr-1" />
                          {auction.currentPrice}
                        </Badge>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold">
                      <span>Total Current Price</span>
                      <Badge variant="default">
                        <DollarSignIcon className="w-4 h-4 mr-1" />
                        {totalCurrentPrice}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
