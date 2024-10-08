import { Loader } from "lucide-react";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "./header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next2 App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-full pt-16`}>
        <Header />
        <main className="container py-2 px-8 mx-auto">
          <SessionProvider>
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
