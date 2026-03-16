// components/layout/NavBar.tsx
"use client"

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCartStore } from "@/state/cartStore";
import Image from "next/image";
import Link from "next/link";
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

	useEffect(() => {
		const setVh = () => {
			document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
		}
		setVh()
		window.addEventListener('resize', setVh)
		return () => window.removeEventListener('resize', setVh)
	}, [])

	const { scrollY } = useScroll();
	const blur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(6px)'])
	const boxShadow = useTransform(scrollY, [0, 100], ['0 0px 0px rgba(0,0,0,0)', '0 4px 12px rgba(0,0,0,0.6)'])
	const bgColor = useTransform(scrollY, [250, 500], [
		'linear-gradient(to bottom, black 0%, transparent 0%)',
		'linear-gradient(to bottom, black 0%, transparent 100%)'
	])

	return (
		<nav className="fixed top-0 w-full z-[100]">
			<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
			<Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<TopBar />

			<motion.div
				style={{ backdropFilter: blur, boxShadow, backgroundImage: bgColor }}
				className="relative z-[100] flex justify-between items-center px-4 py-4 md:px-8"
			>
				{/* Left — Menu */}
				<button
					onClick={() => { setIsMenuOpen(!isMenuOpen); setIsCartOpen(false) }}
					className="relative z-[100] w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
				>
					<Image
						src={isMenuOpen ? "/icons/cross.svg" : "/icons/menu.svg"}
						alt="Menu"
						width={22}
						height={22}
						priority
						className="invert"
					/>
				</button>

				{/* Center — Logo */}
				<Link
					href="/"
					onClick={() => { setIsCartOpen(false); setIsMenuOpen(false) }}
					className="absolute left-1/2 -translate-x-1/2 z-[100]"
				>
					<Image
						src="/images/logo.png"
						alt="Pathway"
						width={110}
						height={30}
						priority
						className="object-contain"
					/>
				</Link>

				{/* Right — Cart */}
				<button
					onClick={() => { setIsCartOpen(!isCartOpen); setIsMenuOpen(false) }}
					className="relative z-[100] w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
				>
					<div className="relative">
						<Image
							src={isCartOpen ? "/icons/cross.svg" : "/icons/bag.svg"}
							alt="Cart"
							width={22}
							height={22}
							priority
							className="invert"
						/>
						{!isCartOpen && itemCount > 0 && (
							<span className="absolute -bottom-1 -right-1 bg-white text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold">
								{itemCount}
							</span>
						)}
					</div>
				</button>

			</motion.div>
		</nav>
	);
}
