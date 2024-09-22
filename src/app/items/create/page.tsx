"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./actions";
import { Heading } from "@/components/heading";
import { Label } from "@/components/ui/label";

const CreateBid = () => {
  return (
    <div className="container mx-auto px-4 py-0 flex flex-col items-center">
      <Heading>Post an Item to Sell</Heading>
      <form
        action={createItemAction}
        className="space-y-6 min-w-[400px] max-w-lg"
      >
        <div className="space-y-2">
          <Label htmlFor="item-name">Item Name</Label>
          <Input
            id="item-name"
            name="name"
            placeholder="Name your item"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="item-price">Starting Price</Label>
          <Input
            id="startingPrice"
            type="number"
            name="startingPrice"
            placeholder="What to start your auction at"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="item-image">Item Image</Label>
          <Input
            id="item-image"
            name="file"
            type="file"
            accept="image/*"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Post Item
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Heading>Post an item to sell</Heading>

      <form action={createItemAction} className="py-8 rounded-xl space-y-4">
        <div className="flex flex-col align-items-start gap-x-2 max-w-lg gap-y-4">
          <Input
            className=""
            required
            name="name"
            type="text"
            placeholder="Name your item"
          />
          <Input
            className=""
            required
            name="startingPrice"
            type="number"
            step="0.01"
            placeholder="What to start your auction at"
          />
          <Input type="file" name="file" required />
          <Button className="self-end" type="submit">
            Post item
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateBid;
