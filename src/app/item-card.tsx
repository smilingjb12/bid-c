import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const ItemCard = ({
  item,
  canPlaceBid,
}: {
  item: Item;
  canPlaceBid: boolean;
}) => {
  return (
    <div
      key={item.id}
      className="flex flex-col w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
        <p className="text-gray-600 mb-4">${item.currentPrice}</p>
        <div className="flex-grow flex items-center justify-center mb-4">
          <Image
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
      </div>
      {canPlaceBid && (
        <div className="p-4 bg-gray-50">
          <Button asChild variant="default" className="w-full">
            <Link href={`/items/${item.id}`}>Place Bid</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
