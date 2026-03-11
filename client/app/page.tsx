import Image from "next/image";

import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";

export default function Home() {
	return (
		<main>
		  <Hero />
			<NewArrivals />
		</main>
	)
}