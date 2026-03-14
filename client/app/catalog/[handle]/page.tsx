import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/productTypes";

import CityBackground from "@/components/layout/CityBackground";
import ProductInteractive from "@/components/product/ProductInteractive";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
	const { handle } = await params;
	const products = await getProducts();
	const product = products.find((p: Product) => p.handle === handle);

	if (!product) return <p className="pt-24">Product not found</p>;

	return (
		<main>
			<CityBackground />

			<div className="flex">
				<Link href="/">Home</Link>
				<p className="mx-2">/</p>
				<Link href="/catalog">Catalog</Link>
				<p className="mx-2">/</p>
				<p>{product.productType}</p>
				<p className="mx-2">/</p>
				<p>{product.title}</p>
			</div>

				
				<div className="flex flex-col gap-4">
				{/* interactive */}
				<ProductInteractive product={product} />
			</div>
		</main>
	);
}
