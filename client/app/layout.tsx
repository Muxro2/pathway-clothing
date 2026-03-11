import type { Metadata } from "next";
import { Big_Shoulders } from "next/font/google";
import "./globals.css";

import NavBar from '@/components/NavBar'

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
});


export const metadata: Metadata = {
  title: "Pathway",
  description: "Where every drop tells a story — yours begins here. Step, don't follow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bigShoulders.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
