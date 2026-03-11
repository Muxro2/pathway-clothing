"use client"

import { motion, useScroll, useTransform } from "framer-motion";

import Image from "next/image";
import TopBar from "@/components/TopBar"

export default function NavBar() {
	const { scrollY } = useScroll();
	const blur = useTransform(scrollY, [0, 100], ['(0px)', 'blur(4px)'])
	const boxShadow = useTransform(scrollY, [0, 100], ['0 0px 0px rgba(0,0,0,0)', '0 4px 8px rgba(0, 0, 0, 0.5)'])
	
	return (
		<nav className="fixed w-full z-100">
			<TopBar />
			<motion.div style={{ backdropFilter: blur, boxShadow }} className="flex justify-between items-center p-4">
				

					<Image
						src="/icons/menu.svg"
						alt="Menu"
						width={32}
						height={32}
						priority
					/>
			
					<a href="/" className="text-[20px]">
					<Image
						src="/images/logo.png"
						alt="Logo"
						width={120}
						height={32}
						priority
						className="object-cover aspect-2/1 "
						/>
				</a>

        <Image
						src="/icons/bag.svg"
						alt="Cart"
						width={32}
						height={32}
						priority
					/>
				
				
			</motion.div>
		</nav>
	);
}
