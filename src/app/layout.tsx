import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

// import Drawer from "@/components/Drawer";
import { fontSans } from "@/lib/fonts";
import React from "react";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  // title: "BPGC Everyone",
  description: "A website to view BITS-GOA student information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>BPGC Everyone</title>
        <link rel="icon" href="/magnifying-glass.svg" />
      </head>
      <body
        className={cn(
          "dark:bg-stone-950 bg-white relative flex min-h-screen w-full flex-col justify-center scroll-smooth bg-background font-sans antialiased",
          fontSans.variable,
          "dark"
        )}
      >
        <div className="flex min-h-screen flex-col items-center px-3 pt-8">
          {children}
        </div>
        <Separator className="mt-3 w-full" />
        <Analytics />
      </body>
    </html>
  );
}
