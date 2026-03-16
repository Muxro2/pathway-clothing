// NewArrivals.tsx
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/productTypes";
import CityBackground from '@/components/layout/CityBackground';
import ProductCarousel from "@/components/product/ProductCarousel";
import Link from "next/link";

export default async function NewArrivals() {
	const products = await getProducts();
	const newArrivals = products.filter((p: Product) => p.tags?.includes("new-arrivals"));

	return (
		<section id="new" className="relative w-full py-10 flex flex-col gap-2">
			<CityBackground className="object-left" />
			<div className="flex items-end justify-between px-4">
				<h3 className="tracking-[0.1em] uppercase">New Arrivals</h3>
				<Link href="/catalog" className="font-mono text-xs text-white/50 tracking-widest uppercase hover:text-white transition-colors">
					View All
				</Link>
			</div>
			<ProductCarousel products={newArrivals} />
		</section>
	);
}
