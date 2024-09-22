"use client";

import { useEffect } from "react";
import supabaseClient from "@/db/supabase-client";

const TestPage = () => {
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
        (payload) => {
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);
  return <div>Test</div>;
};

export default TestPage;
