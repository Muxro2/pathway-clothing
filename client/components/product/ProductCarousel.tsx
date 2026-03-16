// components/product/ProductCarousel.tsx
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

	return (
		<motion.div
			ref={ref}
			style={{ maskImage }}
			className="w-full px-4 py-2 flex gap-3 overflow-x-scroll"
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
	);
}
