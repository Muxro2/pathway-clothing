"use client"


import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Image from "next/image";
import TopBar from "@/components/layout/TopBar";
import Menu from "@/components/layout/Menu";
import CartDrawer from "@/components/cart/CartDrawer";

export default function NavBar() {

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);


	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isMenuOpen])
	
	const { scrollY } = useScroll();
	const blur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(4px)'])
	const boxShadow = useTransform(scrollY, [0, 100], ['0 0px 0px rgba(0,0,0,0)', '0 4px 8px rgba(0, 0, 0, 0.5)'])
	
		return (
			<nav className="fixed top-0 w-full z-100">
				<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
				<Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
				<TopBar />
				<motion.div style={{ backdropFilter: blur, boxShadow }} className="flex justify-between items-center p-4">
					<button className="z-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<Image
							src={isMenuOpen ? "/icons/cross.svg" : "/icons/menu.svg"}
							alt="Menu"
							width={32}
							height={32}
							priority
							className="invert"
						/>
					</button>

					<a href="/" className="text-[20px]">
						<Image
							src="/images/logo.png"
							alt="Logo"
							width={120}
							height={32}
							priority
							className="object-cover aspect-2/1"
						/>
					</a>

					<button onClick={() => setIsCartOpen(!isCartOpen)}>
					<Image
						src="/icons/bag.svg"
						alt="Cart"
						width={32}
						height={32}
						priority
					/>
					</button>
				</motion.div>
			</nav>
	);
}
