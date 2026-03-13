"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/productTypes";

import ProductCarousel from "./product/ProductCarousel";

export default function FeaturedPicksTabs({ tops, jackets }: { tops: Product[], jackets: Product[] }) {
	const [activeTab, setActiveTab] = useState("tops");
	const products = activeTab === "tops" ? tops : jackets;

	return (
		<>
			<div className="flex">
				<h4
					onClick={() => setActiveTab("tops")}
					className={`p-4 text-[20px] font-big-shoulders tracking-[0.1em] font-semibold uppercase cursor-pointer ${activeTab !== "tops" && "opacity-50"}`}
				>Tops</h4>
				<h4
					onClick={() => setActiveTab("jackets")}
					className={`p-4 text-[20px] font-big-shoulders tracking-[0.1em] font-semibold uppercase cursor-pointer ${activeTab !== "jackets" && "opacity-50"}`}
				>Jackets</h4>
			</div>
			<div className="w-full flex overflow-x-scroll">
				<ProductCarousel products={products}/>
			</div>
		</>
	);
}
