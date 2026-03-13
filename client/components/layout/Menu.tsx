"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"; 
import Link from "next/link";

export default function Menu({isMenuOpen, setIsMenuOpen}: {isMenuOpen: boolean, setIsMenuOpen: (isMenuOpen: boolean) => void}) {

  
	
	return (
		<AnimatePresence>
			{isMenuOpen &&
<motion.div 
	initial={{ y: "-100%", opacity: 0 }}
	animate={{ y: 0, opacity: 1 }}
	exit={{ y: "-100%", opacity: 0 }}
	transition={{ type: "tween", duration: 0.3 }}
	className="fixed top-0 w-full z-90">
		<main className="menu pt-32 px-4 w-full z-90 h-screen bg-black">
			  <motion.nav
					initial={{ y: "20%", opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: "20%", opacity: 0 }}
					transition={{ type: "tween", duration: 0.2, delay: 0.2 }}
					className="flex flex-col text-center gap-2">
        <section>
          <h3 className="py-2">Shop</h3>
          <ul>
            <li>
              <Link href="/catalog?category=Hoodies" onClick={() => setIsMenuOpen(false)}>Hoodies</Link>
            </li>
            <li>
              <Link href="/catalog?category=Tracksuits" onClick={() => setIsMenuOpen(false)}>Tracksuits</Link>
            </li>
            <li>
              <Link href="/catalog?category=Jackets" onClick={() => setIsMenuOpen(false)}>Jackets</Link>
            </li>
            <li>
              <Link href="/catalog?category=T-Shirts" onClick={() => setIsMenuOpen(false)}>T-Shirts</Link>
            </li>
            <li>
              <Link href="/catalog?category=Accessories" onClick={() => setIsMenuOpen(false)}>Accessories</Link>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="py-2">Information</h3>
          <ul>
            <li>
              <Link href="/privacy-policy" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" onClick={() => setIsMenuOpen(false)}>Terms and Conditions</Link>
            </li>
            <li>
              <Link href="/returns" onClick={() => setIsMenuOpen(false)}>Returns</Link>
            </li>
          </ul>
        </section>
      </motion.nav>
		</main>
</motion.div>
			}
			</AnimatePresence>
	);
}
