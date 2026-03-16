// FeaturedPicksTabs.tsx
"use client";

import { useState } from "react";
import { Product } from "@/types/productTypes";
import ProductCarousel from "./product/ProductCarousel";

export default function FeaturedPicksTabs({ tops, jackets }: { tops: Product[], jackets: Product[] }) {
	const [activeTab, setActiveTab] = useState("tops");
	const products = activeTab === "tops" ? tops : jackets;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-6 px-4 border-b border-white/10">
				{["tops", "jackets"].map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`pb-3 font-big-shoulders text-[13px] tracking-[0.2em] uppercase transition-all border-b-2 -mb-px ${
							activeTab === tab ? "border-white text-white" : "border-transparent text-white/40"
						}`}
					>
						{tab}
					</button>
				))}
			</div>
			<ProductCarousel products={products} />
		</div>
	);
}
