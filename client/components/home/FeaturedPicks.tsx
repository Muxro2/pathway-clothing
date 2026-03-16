// FeaturedPicks.tsx
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/productTypes";
import CityBackground from '@/components/layout/CityBackground';
import FeaturedPicksTabs from "@/components/FeaturedPicksTabs";
import Link from "next/link";

export default async function FeaturedPicks() {
	const products = await getProducts();
	const featuredTops = products.filter((p: Product) => p.tags?.includes("tops"));
	const featuredJackets = products.filter((p: Product) => p.tags?.includes("jackets"));

	return (
		<section id="featured" className="relative w-full py-10 flex flex-col gap-2">
			<CityBackground />
			<div className="flex items-end justify-between px-4">
				<h3 className="tracking-[0.1em] uppercase">Featured Picks</h3>
				<Link href="/catalog" className="font-mono text-xs text-white/50 tracking-widest uppercase hover:text-white transition-colors">
					View All
				</Link>
			</div>
			<FeaturedPicksTabs tops={featuredTops} jackets={featuredJackets} />
		</section>
	);
}
