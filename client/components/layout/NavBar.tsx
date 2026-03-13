"use client"


import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useCartStore } from "@/state/cartStore";

import Image from "next/image";
import TopBar from "@/components/layout/TopBar";
import Menu from "@/components/layout/Menu";
import CartDrawer from "@/components/cart/CartDrawer";

export default function NavBar() {

	const { lines } = useCartStore()
	const itemCount = lines.reduce((acc, line) => acc + line.quantity, 0)

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);


	useEffect(() => {
		if (isMenuOpen || isCartOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isMenuOpen, isCartOpen])
	
	const { scrollY } = useScroll();
	const blur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(4px)'])
	const boxShadow = useTransform(scrollY, [0, 100], ['0 0px 0px rgba(0,0,0,0)', '0 4px 8px rgba(0, 0, 0, 0.5)'])
	const bgColor = useTransform(scrollY, [250, 500], ['linear-gradient(to bottom, black 0%, transparent 0%)', 'linear-gradient(to bottom, black 0%, transparent 100%)'])
	
		return (
			<nav className="fixed top-0 w-full z-100">
				<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
				<Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
				<TopBar />
				<motion.div style={{ backdropFilter: blur, boxShadow, backgroundImage: bgColor }} className="flex justify-between items-center p-4">
					<button className="z-200" onClick={() => {
				setIsMenuOpen(!isMenuOpen)
					setIsCartOpen(false)
					}}>
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

					
					<button onClick={() => { setIsCartOpen(!isCartOpen); setIsMenuOpen(false) }}>
						<div className="relative">

							<Image
								src={isCartOpen ? "/icons/cross.svg" : "/icons/bag.svg"}
								alt="Menu"
								width={32}
								height={32}
								priority
								className="invert"
							/>
							{!isCartOpen && itemCount > 0 && (
								<span className="absolute -bottom-1 right-0 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
									{itemCount}
								</span>
							)}
						</div>
					</button>

				</motion.div>
			</nav>
	);
}
