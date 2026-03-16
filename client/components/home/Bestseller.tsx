// Bestseller.tsx
import Image from "next/image";
import Link from "next/link";

export default function Bestseller() {
	return (
		<section id="bestseller" className="relative w-full md:h-[70vh] aspect-square md:aspect-auto overflow-hidden">
			<Image
				src="/images/bestseller.jpeg"
				alt="Bestsellers"
				fill
				sizes="100vw"
				priority
				className="object-cover object-center contrast-110 saturate-60 brightness-70"
			/>

			<div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 gap-4">
				<p className="font-mono text-xs tracking-[0.3em] text-white/60 uppercase">Collection</p>
				<h3 className="tracking-[0.1em] uppercase leading-none">Bestsellers</h3>
				<Link
					href="/catalog"
					className="w-fit font-big-shoulders text-[13px] tracking-[0.2em] uppercase border-b border-white pb-1 hover:opacity-70 transition-opacity"
				>
					Shop Now
				</Link>
			</div>
		</section>
	)
}
