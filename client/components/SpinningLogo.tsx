"use client"

import Image from "next/image";
import { motion } from "framer-motion";

export default function SpinningLogo() {
	return (
		<motion.div
			initial={{ scaleX: 1 }}
			animate={{ scaleX: [0, -1, 0, 1] }}
			transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
			className="my-8"
			>
<Image
	src="/images/double_cross.png"
	alt="Logo"
	width={600}
	height={192}
	priority
	className="w-40 object-cover drop-shadow-[0_4px_8px_rgba(0,0,0,.5)]"
	/>
		</motion.div>
	)
}