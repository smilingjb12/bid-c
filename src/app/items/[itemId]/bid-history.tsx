"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Bid } from "@/db/schema";
import { BidHistoryItem } from "@/queries/bids";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";

function formatDate(date: Date) {
  return formatDistance(date, new Date(), { addSuffix: true });
}

export const BidHistory = ({ bids }: { bids: BidHistoryItem[] }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2">Bid History</h3>
      {bids.length <= 0 ? (
        <h2 className="text-muted-foreground">No bids yet...</h2>
      ) : (
        <div className="h-[350px] w-full rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-1/3">Bidder</TableHead>
                <TableHead className="w-1/3">Amount</TableHead>
                <TableHead className="w-1/3">When</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <ScrollArea className="h-[calc(350px-2.5rem)]">
            <Table>
              <TableBody>
                {bids.map((bid, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-1/3">{bid.userName}</TableCell>
                    <TableCell className="w-1/3">${bid.amount}</TableCell>
                    <TableCell className="w-1/3">
                      {formatDate(new Date(bid.timestamp))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
