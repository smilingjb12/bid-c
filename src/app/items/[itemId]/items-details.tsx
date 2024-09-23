"use client";

import { Hint } from "@/components/hint";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Item } from "@/db/schema";
import { getImageUrl } from "@/lib/utils";
import { BidHistoryItem } from "@/queries/bids";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import { Clock, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
function formatDate(date: Date) {
  return formatDistance(date, new Date(), { addSuffix: true });
}

export const ItemsDetails = () => {
  const params = useParams();
  const itemId = params.itemId as string;
  const queryClient = useQueryClient();
  const session = useSession();
  const { data: item, isLoading: isItemLoading } = useQuery<Item>({
    queryKey: ["items"],
    queryFn: () => fetch(`/api/items/${itemId}`).then((res) => res.json()),
  });
  const { data: bids } = useQuery<BidHistoryItem[]>({
    queryKey: ["bids"],
    queryFn: () =>
      fetch(`/api/bids/history/${itemId}`).then((res) => res.json()),
  });
  const createBidMutation = useMutation({
    mutationFn: () =>
      fetch(`/api/bids/create?itemId=${itemId}`, {
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes("bids") || query.queryKey.includes("items"),
      });
    },
  });

  const canPlaceBid = session?.data?.user?.id !== item?.userId;
  const priceAfterBid = item
    ? Number(item.currentPrice) + Number(item.bidInterval)
    : 0;

  const createBid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBidMutation.mutate();
  };

  if (isItemLoading || !item || item.id !== Number(itemId)) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-lg">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <div className="relative aspect-[4/3] mb-4">
            <Image
              src={getImageUrl(item.fileKey)}
              alt="Auction Item"
              fill
              className="rounded-lg shadow-lg object-cover"
            />
            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
              <p className="text-lg font-semibold">Current bid</p>
              <p className="text-3xl font-bold">${item.currentPrice}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-semibold">Starting Price</p>
                <p className="text-xl font-bold">${item.startingPrice}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-semibold">Bid Increment</p>
                <p className="text-xl font-bold">${item.bidInterval}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm bg-muted p-4 rounded-lg">
              <Clock className="w-5 h-5" />
              <span>2 days, 5 hours remaining</span>
            </div>
            <Hint label="Can't bind on your own items" side="right">
              <form onSubmit={createBid}>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={!canPlaceBid || createBidMutation.isPending}
                >
                  {createBidMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Place Bid (${priceAfterBid})
                </Button>
              </form>
            </Hint>
          </div>
        </div>
        {/* Right Column */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Bid History</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bidder</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids?.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.userName}</TableCell>
                  <TableCell>${b.amount}</TableCell>
                  <TableCell>{formatDate(new Date(b.timestamp))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
