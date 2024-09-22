"use client";

import { Hint } from "@/components/hint";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/db/schema";
import supabaseClient from "@/db/supabase-client";
import { getImageUrl } from "@/lib/utils";
import { BidHistoryItem } from "@/queries/bids";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { BidHistory } from "./bid-history";

export const ItemsDetails = () => {
  const params = useParams();
  const itemId = params.itemId as string;
  const queryClient = useQueryClient();
  const session = useSession();
  const { data: item, isLoading: isItemLoading } = useQuery<Item>({
    queryKey: ["items"],
    queryFn: () => fetch(`/api/items/${itemId}`).then((res) => res.json()),
  });
  const { data: bids, isLoading: isBidsLoading } = useQuery<BidHistoryItem[]>({
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
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full">
          <CardHeader className="pb-2 pt-2 pl-12">
            <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-center relative w-full h-[400px]">
              <Image
                src={getImageUrl(item.fileKey)}
                alt={item.name}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Current Bid</h3>
                <p className="text-3xl font-bold">${item.currentPrice}</p>
              </div>
              <div className="flex flex-row space-x-8">
                <div>
                  <h3 className="text-lg font-semibold">Starting Price</h3>
                  <p className="text-xl">${item.startingPrice}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-muted-foreground">
                    Bid Increment
                  </h3>
                  <p className="text-xl text-muted-foreground">
                    ${item.bidInterval}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>2 days, 5 hours remaining</span>
              </div>
              <form onSubmit={(e) => createBid(e)} className="space-y-2 pb-4">
                <div className="flex space-x-2">
                  <Hint label="Can't bind on your own items" side="bottom">
                    <div>
                      <Button
                        type="submit"
                        disabled={!canPlaceBid || createBidMutation.isPending}
                      >
                        {createBidMutation.isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Place Bid (${priceAfterBid})
                      </Button>
                    </div>
                  </Hint>
                </div>
              </form>
              {!isBidsLoading && <BidHistory bids={bids!} />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
