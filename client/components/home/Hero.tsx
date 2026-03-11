import Image from "next/image";

import SpinningLogo from "@/components/SpinningLogo"

export default function Hero() {
	return (
		<section id="hero" className="relative w-full h-160">
		  <Image
				src="/images/hero.jpeg"
				alt="Hero"
				fill
				sizes="100vw"
				priority
				className="object-cover brightness-85"
				/>
			
			<div className="absolute inset-0 pt-28 flex flex-col justify-between items-center">
				
        <div>
        <h1 className="mt-6 text-[140px] font-bold text-white font-black leading-none">STEP</h1>
				<h2 className="text-[46px] font-bold text-white font-bold leading-none -mt-4">DON'T FOLLOW</h2>
				</div>

				<SpinningLogo />

				<div className="w-full flex mb-2">
				<button className="flex-1 text-white text-[16px] font-bold">SHOP NOW</button>
					<div className="w-px h-8 bg-white"/>
					<button className="flex-1 text-white text-[16px] font-bold">MEMBERS CLUB</button>
				</div>
				
			</div>
		</section>
	)
}