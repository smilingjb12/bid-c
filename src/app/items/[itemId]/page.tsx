"use client";

import { queryClient } from "@/client-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ItemsDetails } from "./items-details";

const ItemPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ItemsDetails />
    </QueryClientProvider>
  );
};

export default ItemPage;
