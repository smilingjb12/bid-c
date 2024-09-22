import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const ItemCard = ({
  item,
  canPlaceBid,
  canView,
}: {
  item: Item;
  canPlaceBid: boolean;
  canView: boolean;
}) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <Image
        src={getImageUrl(item.fileKey)}
        alt={item.name}
        width={400}
        height={400}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-x-0 top-0 bg-black bg-opacity-60 p-4">
        <h2 className="text-xl font-bold text-white">{item.name}</h2>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-white">${item.currentPrice}</p>
        {canView && (
          <Button asChild variant="secondary" className="">
            <Link href={`/items/${item.id}`}>
              {canPlaceBid ? "Place Bid" : "View"}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
