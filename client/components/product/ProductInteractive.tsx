// components/product/ProductInteractive.tsx
"use client"
import { useState } from "react"
import { Product, ProductVariant } from "@/types/productTypes"
import AddToCart from "@/components/cart/AddToCart"

export default function ProductInteractive({ product }: { product: Product }) {
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0])

	const sizes = product.variants.map((v: any) => ({
		variant: v,
		size: v.selectedOptions?.find((o: any) => o.name === "Size")?.value ?? v.sku,
		available: v.quantityAvailable > 0
	}))

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h4 className="text-[20px] font-big-shoulders tracking-[0.1em] font-semibold">{product.title}</h4>
				<p className="font-mono font-thin">£{parseFloat(selectedVariant.price.amount).toFixed(2)}</p>
			</div>

			<div className="flex gap-2">
				{sizes.map(({ variant, size, available }: any) => (
					<button
						key={variant.id}
						disabled={!available}
						onClick={() => setSelectedVariant(variant)}
						className={`px-3 py-1 border ${selectedVariant.id === variant.id ? "border-white" : "border-white/30"} ${!available ? "opacity-30 line-through" : ""}`}
					>
						{size}
					</button>
				))}
			</div>

			{(selectedVariant as any).quantityAvailable > 0 ? (
				<AddToCart merchandiseId={selectedVariant.id} />
			) : (
				<button disabled className="opacity-50">Out of Stock</button>
			)}

			<p className="font-mono font-thin text-sm">{product.description}</p>
		</div>
	)
}
