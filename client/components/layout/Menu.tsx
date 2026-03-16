// components/layout/Menu.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Menu({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (isMenuOpen: boolean) => void }) {

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 left-0 w-full md:w-[380px] h-screen z-[50] bg-black border-r border-white/10"
        >
          <div className="pt-32 px-8 flex flex-col gap-10">

            {/* Shop */}
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Shop</p>
              <ul className="flex flex-col gap-2">
                {["Hoodies", "Tracksuits", "Jackets", "T-Shirts", "Accessories"].map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/catalog?category=${cat}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-big-shoulders text-[28px] tracking-[0.05em] uppercase font-semibold hover:opacity-50 transition-opacity"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Information</p>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms & Conditions", href: "/terms-and-conditions" },
                  { label: "Returns", href: "/returns" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-mono text-[13px] text-white/50 tracking-widest uppercase hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
