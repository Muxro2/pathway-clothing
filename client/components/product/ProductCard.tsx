// components/product/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/productTypes";

export default function ProductCard({ product, className, priority = false }: { product: Product, className?: string, priority?: boolean }) {
	return (
		<Link href={`/catalog/${product.handle}`} className={`flex-shrink-0 flex flex-col group ${className}`}>

			{/* Image */}
			<div className="relative w-full aspect-2/3 overflow-hidden">
				<Image
					src={product.images[0]?.src || "/products/white_tee.png"}
					alt={product.images[0]?.altText ?? product.title}
					fill
					sizes="40vw"
					priority={priority}
					className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
				/>
			</div>

			{/* Info */}
			<div className="mt-3 px-1 flex flex-col gap-1">
				<h4 className="text-[13px] font-big-shoulders tracking-[0.08em] font-semibold uppercase leading-tight">
					{product.title}
				</h4>
				<div className="flex items-center justify-between">
					<p className="font-mono text-[12px] text-white/70">
						£{parseFloat(product.variants[0]?.price?.amount).toFixed(2)}
					</p>
					{Object.keys(product.colorSizes).length > 1 && (
						<p className="font-mono text-[10px] text-white/40 tracking-widest">
							{Object.keys(product.colorSizes).length} colours
						</p>
					)}
				</div>
			</div>

		</Link>
	)
}
