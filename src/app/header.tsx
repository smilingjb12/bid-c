import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Package } from "lucide-react";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <header className="bg-gray-100 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background border-b shadow-sm">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <Package className="h-6 w-6" />
          <span className="text-lg font-semibold">Bid-C</span>
        </Link>
      </div>
      {session?.user?.id && (
        <nav className="flex-1 ml-6">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/items/create"
                className="text-sm font-medium hover:underline"
              >
                Create Auction
              </Link>
            </li>
            <li>
              <Link
                href="/auctions"
                className="text-sm font-medium hover:underline"
              >
                My Auctions
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">{session?.user?.name}</span>
        {session?.user?.id ? <SignOut /> : <SignIn />}
      </div>
    </header>
  );
}
