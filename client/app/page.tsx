import Image from "next/image";

import Hero from "@/components/home/Hero"

export default function Home() {
	return (
		<main>
		  <Hero />
			<div className="relative w-full h-160 bg-black">
				<Image
					src="/backgrounds/london.jpeg"
					alt="Hero"
					fill
					sizes="100vw"
					priority
					className="object-cover object-right brightness-100 mix-blend-hard-light"
					/>
			</div>
		</main>
	)
}