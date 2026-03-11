import Image from "next/image";

import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import Bestseller from "@/components/home/Bestseller";
import FeaturedPicks from "@/components/home/FeaturedPicks"

export default function Home() {
	return (
		<main>
		  <Hero />
			<NewArrivals />
			<Bestseller />
			<FeaturedPicks />
		</main>
	)
}