// app/catalog/[handle]/page.tsx
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/productTypes";
import CityBackground from "@/components/layout/CityBackground";
import ProductInteractive from "@/components/product/ProductInteractive";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
	const { handle } = await params;
	const products = await getProducts();
	const product = products.find((p: Product) => p.handle === handle);

	if (!product) return (
		<main className="flex items-center justify-center">
			<p className="font-mono text-white/40 tracking-widest uppercase text-sm">Product not found</p>
		</main>
	);

	return (
		<main>
			<CityBackground />

			{/* Breadcrumb */}
			<div className="px-6 py-3 flex items-center gap-2 font-mono text-[10px] text-white/30 tracking-widest uppercase overflow-x-auto">
				<Link href="/" className="hover:text-white transition-colors shrink-0">Home</Link>
				<span>/</span>
				<Link href="/catalog" className="hover:text-white transition-colors shrink-0">Catalog</Link>
				<span>/</span>
				<Link href={`/catalog?category=${product.productType}`} className="hover:text-white transition-colors shrink-0">
					{product.productType}
				</Link>
				<span>/</span>
				<span className="text-white/60 truncate">{product.title}</span>
			</div>

			{/* Product Layout */}
			<div className="md:w-[30%] mx-auto">
				<ProductInteractive product={product} />
			</div>

		</main>
	);
}
