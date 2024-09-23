import Loader from "@/components/loader";
import { Suspense } from "react";
import { AuctionsGrid } from "./auctions-grid";

export default async function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <AuctionsGrid />
    </Suspense>
  );
}
