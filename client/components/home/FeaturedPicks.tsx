import Image from "next/image";
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/productTypes";
import FeaturedPicksTabs from "@/components/FeaturedPicksTabs";

export default async function FeaturedPicks() {
	const products = await getProducts();
	const featuredTops = products.filter((p: Product) => p.tags?.includes("tops"));
	const featuredJackets = products.filter((p: Product) => p.tags?.includes("jackets"));

	return (
		<section id="new" className="relative w-full py-8 flex flex-col">
			<Image
				src="/backgrounds/london.jpeg"
				alt="Hero"
				fill
				sizes="100vw"
				priority
				className="object-cover object-left brightness-100 mix-blend-hard-light -z-50"
			/>
			<h3 className="p-4 text-[32px] font-big-shoulders tracking-[0.1em] font-semibold uppercase">Featured Picks</h3>
			<FeaturedPicksTabs tops={featuredTops} jackets={featuredJackets} />
		</section>
	);
}
