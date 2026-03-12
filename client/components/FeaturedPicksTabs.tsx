"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/productTypes";

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
			<div className="w-full backdrop-blur-xs shadow-xl flex overflow-x-scroll">
				{products.map((product: Product) => (
					<div key={product.id} className="flex-shrink-0 w-[50%] p-4 flex flex-col gap-2 text-center">
						<Image
							src={product.images[0]?.src || "/products/white_tee.png"}
							alt={product.images[0]?.altText ?? product.title}
							width={400}
							height={400}
							className="w-full aspect-2/3 object-cover object-center"
						/>
						<h4 className="text-[20px] font-big-shoulders tracking-[0.1em] font-semibold">{product.title}</h4>
						<p className="font-mono font-thin">£{parseFloat(product.variants[0]?.price.amount).toFixed(2)}</p>
					</div>
				))}
			</div>
		</>
	);
}
