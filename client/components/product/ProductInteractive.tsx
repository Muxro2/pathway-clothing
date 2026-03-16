// components/product/ProductInteractive.tsx
"use client"
import { useState, useEffect, useRef } from "react"
import { Product, ProductVariant } from "@/types/productTypes"
import Image from "next/image"
import AddToCart from "@/components/cart/AddToCart"

export default function ProductInteractive({ product }: { product: Product }) {

	const sliderRef = useRef<HTMLDivElement>(null)

	const colors = Object.keys(product?.colorSizes)
	const [selectedColor, setSelectedColor] = useState<string>(colors[0])
	const [imageLoaded, setImageLoaded] = useState(false)

	const sizesForColor = product.variants.filter((v: any) =>
		v.selectedOptions?.find((o: any) => o.name === "Color")?.value === selectedColor
	).map((v: any) => ({
		variant: v,
		size: v.selectedOptions?.find((o: any) => o.name === "Size")?.value ?? v.sku,
		available: v.quantityAvailable > 0
	}))

	const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(sizesForColor[0]?.variant ?? product.variants[0])

	const handleColorSelect = (color: string) => {
		setSelectedColor(color)
		setImageLoaded(false)
		const firstAvailable = product.variants.find((v: any) =>
			v.selectedOptions?.find((o: any) => o.name === "Color")?.value === color &&
			v.quantityAvailable > 0
		)
		setSelectedVariant(firstAvailable ?? product.variants[0])
	}

	const currentImage = product.images[colors.indexOf(selectedColor)] ?? product.images[0]
	const extraImages = product.images.slice(colors.length)
	const allImages = [currentImage, ...extraImages]

	useEffect(() => {
		sliderRef.current?.scrollTo({ left: 0, behavior: "smooth" })
	}, [selectedColor])

	return (
		<div className="flex flex-col gap-4">

			{/* Image Slider */}
			<div ref={sliderRef} className="overflow-x-auto flex snap-x snap-mandatory scrollbar-none bg-black">
				{allImages.map((image, i) => (
					<div key={i} className="snap-center shrink-0 w-full">
						<Image
							src={image?.src || "/products/white_tee.png"}
							alt={image?.altText ?? product.title}
							width={200}
							height={300}
							sizes="40vw"
							priority={i === 0}
							onLoad={() => { if (i === 0) setImageLoaded(true) }}
							style={i === 0 ? { opacity: imageLoaded ? 1 : 0, transition: "opacity 0.3s ease" } : {}}
							className="mx-auto w-[70%] aspect-2/3 object-cover object-center"
						/>
					</div>
				))}
			</div>

			<div>
				<h4 className="text-[20px] font-big-shoulders tracking-[0.1em] font-semibold">{product.title}</h4>
				<p className="font-mono font-thin">£{parseFloat(selectedVariant.price.amount).toFixed(2)}</p>
			</div>

			{/* Color Selector */}
			<div className="flex flex-col gap-2">
				<span className="font-mono font-thin text-sm text-white/60">Color: {selectedColor}</span>
				<div className="flex gap-2">
					{colors.map((color) => (
						<button
							key={color}
							onClick={() => handleColorSelect(color)}
							className={`px-3 py-1 border ${selectedColor === color ? "border-white" : "border-white/30"}`}
						>
							{color}
						</button>
					))}
				</div>
			</div>

			{/* Size Selector */}
			<div className="flex flex-col gap-2">
				<span className="font-mono font-thin text-sm text-white/60">Size</span>
				<div className="flex gap-2">
					{sizesForColor.map(({ variant, size, available }: any) => (
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
			</div>

			{selectedVariant.quantityAvailable > 0 ? (
				<AddToCart merchandiseId={selectedVariant.id} />
			) : (
				<button disabled className="opacity-50">Out of Stock</button>
			)}

			<p className="font-mono font-thin text-sm">{product.description}</p>
		</div>
	)
}
