import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['**.replit.dev', 'mikey-commerce.myshopify.com'],
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.shopify.com",
    },
  ],
},

};

export default nextConfig;
