"use client"
import { useState, useEffect, useRef } from "react"
import { Product, ProductVariant } from "@/types/productTypes"
import Image from "next/image"
import AddToCart from "@/components/cart/AddToCart"

export default function ProductInteractive({ product }: { product: Product }) {

	const sliderRef = useRef<HTMLDivElement>(null)

	const colors = Object.keys(product?.colorSizes)
	const hasColors = colors.length > 0

	const [selectedColor, setSelectedColor] = useState<string>(colors[0] ?? "")
	const [imageLoaded, setImageLoaded] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)

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

	const handleScroll = () => {
		if (sliderRef.current) {
			const index = Math.round(sliderRef.current.scrollLeft / sliderRef.current.offsetWidth)
			setActiveIndex(index)
		}
	}

	const scrollImage = (direction: "left" | "right") => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: direction === "right" ? sliderRef.current.offsetWidth : -sliderRef.current.offsetWidth,
				behavior: "smooth"
			})
		}
	}

	const currentImage = hasColors
		? product.images[colors.indexOf(selectedColor)] ?? product.images[0]
		: product.images[0]

	const extraImages = product.images.slice(hasColors ? colors.length : 1)
	const allImages = [currentImage, ...extraImages]

	useEffect(() => {
		sliderRef.current?.scrollTo({ left: 0, behavior: "smooth" })
		setActiveIndex(0)
	}, [selectedColor])

	return (
		<div className="flex flex-col">

			{/* Image Slider */}
			<div className="relative group">

				{/* Left Arrow */}
				<button
					onClick={() => scrollImage("left")}
					className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center border border-white/20 bg-black/60 backdrop-blur-sm hover:border-white transition-colors opacity-0 group-hover:opacity-100"
				>
					<span className="font-mono text-white text-lg">←</span>
				</button>

				{/* Right Arrow */}
				<button
					onClick={() => scrollImage("right")}
					className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center border border-white/20 bg-black/60 backdrop-blur-sm hover:border-white transition-colors opacity-0 group-hover:opacity-100"
				>
					<span className="font-mono text-white text-lg">→</span>
				</button>

				<div
					ref={sliderRef}
					onScroll={handleScroll}
					className="overflow-x-auto flex snap-x snap-mandatory scrollbar-none bg-black"
				>
					{allImages.map((image, i) => (
						<div key={i} className="snap-center shrink-0 w-full">
							<Image
								src={image?.src || "/products/white_tee.png"}
								alt={image?.altText ?? product.title}
								width={600}
								height={900}
								sizes="(min-width: 768px) 50vw, 100vw"
								priority={i === 0}
								onLoad={() => { if (i === 0) setImageLoaded(true) }}
								style={i === 0 ? { opacity: imageLoaded ? 1 : 0, transition: "opacity 0.3s ease" } : {}}
								className="mx-auto w-full aspect-2/3 object-cover object-center"
							/>
						</div>
					))}
				</div>

				{/* Dot Indicators */}
				{allImages.length > 1 && (
					<div className="flex justify-center items-center gap-1.5 py-3">
						{allImages.map((_, i) => (
							<div
								key={i}
								className={`rounded-full transition-all duration-300 ${
									activeIndex === i
										? "w-4 h-1 bg-white"
										: "w-1 h-1 bg-white/30"
								}`}
							/>
						))}
					</div>
				)}
			</div>

			{/* Details */}
			<div className="px-6 py-6 flex flex-col gap-6">

				{/* Title + Price */}
				<div className="flex items-start justify-between gap-4">
					<h2 className="font-big-shoulders text-[22px] tracking-[0.08em] uppercase font-semibold leading-tight">
						{product.title}
					</h2>
					<p className="font-mono text-[16px] text-white/80 shrink-0">
						£{parseFloat(selectedVariant.price.amount).toFixed(2)}
					</p>
				</div>

				{/* Color Selector */}
				{hasColors && (
					<div className="flex flex-col gap-3">
						<p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
							Colour — <span className="text-white">{selectedColor}</span>
						</p>
						<div className="flex gap-2 flex-wrap">
							{colors.map((color) => (
								<button
									key={color}
									onClick={() => handleColorSelect(color)}
									className={`px-4 py-2 font-mono text-[11px] tracking-widest uppercase transition-colors border ${
										selectedColor === color
											? "border-white text-white"
											: "border-white/20 text-white/40 hover:border-white/50"
									}`}
								>
									{color}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Size Selector */}
				<div className="flex flex-col gap-3">
					<p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Size</p>
					<div className="flex gap-2 flex-wrap">
						{sizesForColor.map(({ variant, size, available }: any) => (
							<button
								key={variant.id}
								disabled={!available}
								onClick={() => setSelectedVariant(variant)}
								className={`px-4 py-2 font-mono text-[11px] tracking-widest uppercase transition-colors border ${
									selectedVariant.id === variant.id
										? "border-white text-white"
										: "border-white/20 text-white/40 hover:border-white/50"
								} ${!available ? "opacity-20 line-through cursor-not-allowed" : ""}`}
							>
								{size}
							</button>
						))}
					</div>
				</div>

				{/* Add to Cart */}
				{selectedVariant.quantityAvailable > 0 ? (
					<AddToCart merchandiseId={selectedVariant.id} />
				) : (
					<button disabled className="w-full py-4 border border-white/20 font-big-shoulders text-[13px] tracking-[0.2em] uppercase opacity-30 cursor-not-allowed">
						Out of Stock
					</button>
				)}

				{/* Description */}
				{product.description && (
					<div className="border-t border-white/10 pt-6">
						<p className="font-mono text-[12px] text-white/50 leading-relaxed">{product.description}</p>
					</div>
				)}

			</div>
		</div>
	)
}
