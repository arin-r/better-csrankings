import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';

// import Drawer from "@/components/Drawer";
import { Separator } from '@/components/ui/separator';
import { fontSans } from '@/lib/fonts';
import React from 'react';

export const metadata: Metadata = {
  description: 'A website to view Indian CSRankings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <title>CSRankings but Better</title>
        <link rel='icon' href='/magnifying-glass.svg' />
      </head>
      <body
        className={cn(
          'dark:bg-stone-950 bg-white relative flex min-h-screen w-full flex-col justify-center scroll-smooth bg-background font-sans antialiased',
          fontSans.variable,
          'dark'
        )}
      >
        <div className='flex min-h-screen flex-col items-center'>
          {children}
        </div>
        <Separator className='mt-3 w-full' />
        <Analytics />
      </body>
    </html>
  );
}
