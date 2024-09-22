"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/db/schema";
import supabaseClient from "@/db/supabase-client";
import { getImageUrl } from "@/lib/utils";
import { BidHistoryItem } from "@/queries/bids";
import { Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createBidAction } from "./actions";
import { BidHistory } from "./bid-history";

export const ItemsDetails = ({
  item: initialItem,
  bids: initialBids,
}: {
  item: Item;
  bids: BidHistoryItem[];
}) => {
  const [item, setItem] = useState(initialItem);
  const [bids, setBids] = useState([]);
  const session = useSession();
  const canPlaceBid = session?.data?.user?.id !== item?.userId;
  const priceAfterBid = Number(item.currentPrice) + Number(item.bidInterval);

  const fetchBidHistory = useCallback(() => {
    const fetchBidHistory = async () => {
      const response = await fetch(`/api/bids/history/${item.id}`);
      const bidHistory = await response.json();
      setBids(bidHistory);
    };

    fetchBidHistory();
  }, [item.id]);

  const fetchItem = useCallback(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/items/${item.id}`);
      const reponse = await response.json();
      setItem(reponse);
    };

    fetchItem();
  }, [item.id]);

  useEffect(() => {
    const channel = supabaseClient
      .channel("bids")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bids",
        },
        () => {
          fetchBidHistory();
          fetchItem();
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [fetchBidHistory, fetchItem]);

  useEffect(() => {
    fetchBidHistory();
  }, [fetchBidHistory]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full">
          <CardHeader className="pb-2 pt-2 pl-12">
            <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start justify-center">
              <Image
                src={getImageUrl(item.fileKey)}
                alt={item.name}
                width={400}
                height={400}
                className="max-w-full max-h-[700px] w-auto h-auto object-contain rounded-lg"
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
              <form
                action={createBidAction.bind(null, item.id)}
                className="space-y-2 pb-4"
              >
                <div className="flex space-x-2">
                  <Hint label="Can't bind on your own items" side="bottom">
                    <div>
                      <Button type="submit" disabled={!canPlaceBid}>
                        Place Bid (${priceAfterBid})
                      </Button>
                    </div>
                  </Hint>
                </div>
              </form>
              <BidHistory bids={bids} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
