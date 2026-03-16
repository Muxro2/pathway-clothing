"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Product } from "@/types/productTypes";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products }: { products: Product[] }) {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollXProgress } = useScroll({ container: ref });

	const maskLeft = useTransform(scrollXProgress, [0, 0.1], [0, 4]);
	const maskRight = useTransform(scrollXProgress, [0.9, 1], [4, 0]);

	const maskImage = useTransform(
		[maskLeft, maskRight],
		([left, right]) =>
			`linear-gradient(to right, transparent 0%, black ${left}%, black ${100 - (right as any)}%, transparent 100%)`
	);

	const scroll = (direction: "left" | "right") => {
		if (ref.current) {
			ref.current.scrollBy({
				left: direction === "right" ? 400 : -400,
				behavior: "smooth"
			})
		}
	}

	return (
		<div className="relative group">

			{/* Left Arrow */}
			<button
				onClick={() => scroll("left")}
				className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center border border-white/20 bg-black/60 backdrop-blur-sm hover:border-white transition-colors opacity-0 group-hover:opacity-100"
			>
				<span className="font-mono text-white text-lg">←</span>
			</button>

			{/* Right Arrow */}
			<button
				onClick={() => scroll("right")}
				className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center border border-white/20 bg-black/60 backdrop-blur-sm hover:border-white transition-colors opacity-0 group-hover:opacity-100"
			>
				<span className="font-mono text-white text-lg">→</span>
			</button>

			{/* Carousel */}
			<motion.div
				ref={ref}
				style={{ maskImage }}
				className="w-full px-4 py-2 flex gap-3 overflow-x-auto"
			>
				{products.map((product: Product, i: number) => (
					<ProductCard
						key={product.id}
						product={product}
						className="w-[42vw] md:w-[22vw] lg:w-[16vw]"
						priority={i < 2}
					/>
				))}
			</motion.div>

		</div>
	);
}
