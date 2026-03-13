import Image from "next/image";
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/productTypes";

import CityBackground from '@/components/layout/CityBackground';
import ProductCarousel from "@/components/product/ProductCarousel";

export default async function NewArrivals() {
	const products = await getProducts();
	const newArrivals = products.filter((p: Product) => p.tags?.includes("new-arrivals"));

	return (
		<section id="new" className="relative w-full py-8 flex flex-col">
			<CityBackground className="object-left"/>
			<h3 className="p-4 text-[32px] font-big-shoulders tracking-[0.1em] font-semibold uppercase">New Arrivals</h3>
			<ProductCarousel products={newArrivals} />
		</section>
	);
}
