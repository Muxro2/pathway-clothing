import Image from "next/image";

import SpinningLogo from "@/components/SpinningLogo"

export default function NewArrivals() {
	return (
		<section id="new" className="relative w-full py-8 flex flex-col">
				<Image
					src="/backgrounds/london.jpeg"
					alt="Hero"
					fill
					sizes="100vw"
					priority
					className="object-cover object-right brightness-100 mix-blend-hard-light -z-50"
					/>


			<h3 className="p-4 text-[32px] font-big-shoulders tracking-[0.1em] font-semibold uppercase">New Arrivals</h3>
			<div className="w-full backdrop-blur-xs shadow-xl flex overflow-x-scroll">

				{Array.from({ length: 4 }).map((_, i) => (
			<div key={i} className="flex-shrink-0 w-[50%] p-4 flex flex-col gap-2 text-center">
				<Image
					src="/products/white_tee.png"
					alt="White T-Shirt"
					width={400}
					height={400}
					className="w-full aspect-2/3 object-cover object-center"
					/>
				<h4 className="text-[20px] font-big-shoulders tracking-[0.1em] font-semibold">White T-Shirt</h4>
				<p className="font-mono font-thin">£45.00</p>
				</div>
				))}
			

				
			</div>
		</section>
	)
}