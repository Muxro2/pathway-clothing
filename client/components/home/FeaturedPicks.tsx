import Image from "next/image";
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/productTypes";

import CityBackground from '@/components/layout/CityBackground';
import FeaturedPicksTabs from "@/components/FeaturedPicksTabs";

export default async function FeaturedPicks() {
	const products = await getProducts();
	const featuredTops = products.filter((p: Product) => p.tags?.includes("tops"));
	const featuredJackets = products.filter((p: Product) => p.tags?.includes("jackets"));

	return (
		<section id="new" className="relative w-full py-8 flex flex-col">
			<CityBackground />
			<h3 className="p-4 text-[32px] font-big-shoulders tracking-[0.1em] font-semibold uppercase">Featured Picks</h3>
			<FeaturedPicksTabs tops={featuredTops} jackets={featuredJackets} />
		</section>
	);
}
