

import type { Metadata } from "next";
import { Big_Shoulders } from "next/font/google";
import "./globals.css";

import NewsletterModal from "@/components/layout/NewsletterModal";
import NavBar from '@/components/layout/NavBar';

import Footer from '@/components/layout/Footer';

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
        <NewsletterModal />
        <NavBar />
        
        {children}
        <Footer />
      </body>
    </html>
  );
}
