// Hero.tsx
"use client"
import Image from "next/image";
import Link from "next/link";
import SpinningLogo from "@/components/SpinningLogo"

export default function Hero() {
	return (
		<section id="hero" className="relative w-full h-screen md:h-[90vh]">
			<Image
				src="/images/hero.jpeg"
				alt="Hero"
				fill
				sizes="100vw"
				priority
				className="object-cover brightness-75"
			/>

			<div className="absolute inset-0 pt-28 flex flex-col justify-between items-center">

				<div className="text-center">
					<h1 className="text-[18vw] md:text-[12vw] font-black leading-none tracking-tight">STEP</h1>
					<h2 className="text-[6vw] md:text-[4vw] font-bold leading-none tracking-[0.2em] -mt-2 md:-mt-4">DON'T FOLLOW</h2>
				</div>

				<SpinningLogo />

				<div className="w-full flex mb-4 items-center border-t border-white/20">
					<Link href='/catalog' className="flex-1 py-4 text-white text-[13px] font-big-shoulders tracking-[0.2em] font-bold text-center uppercase hover:opacity-70 transition-opacity">
						Shop Now
					</Link>
					<div className="w-px h-6 bg-white/40" />
					<Link href="/members" className="flex-1 py-4 text-white text-[13px] font-big-shoulders tracking-[0.2em] font-bold text-center uppercase hover:opacity-70 transition-opacity">
						Members Club
					</Link>
				</div>

			</div>
		</section>
	)
}
