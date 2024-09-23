import { Suspense } from "react";
import MyAuctions from "./my-auctions";
import Loader from "@/components/loader";

export default async function Auctions() {
  return (
    <Suspense fallback={<Loader />}>
      <MyAuctions />
    </Suspense>
  );
}
