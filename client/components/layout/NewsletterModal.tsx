"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [email, setEmail] = useState("");
	const router = useRouter();

	useEffect(() => {
		const isLoggedIn = document.cookie.includes("shopify_token=");
		if (isLoggedIn) return;

		const seen = localStorage.getItem("pathway_newsletter_timer");
		if (seen) {
			const oneHour = 60 * 60 * 1000;
			if (Date.now() - parseInt(seen, 10) < oneHour) return;
		}

		const timer = setTimeout(() => setIsOpen(true), 3000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => { document.body.style.overflow = ""; };
	}, [isOpen]);

	const handleClose = () => {
		setIsOpen(false);
		localStorage.setItem("pathway_newsletter_timer", Date.now().toString());
	};

	const handleSubmit = () => {
		if (!email || !email.includes("@")) return;
		handleClose();
		router.push(`/login?mode=register&email=${encodeURIComponent(email)}`);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						key="backdrop"
						className="fixed inset-0 bg-black/80 z-[99]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={handleClose}
					/>

					{/* Modal */}
					<motion.div
						key="modal"
						className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-full max-w-md bg-[#0a0a0a] overflow-hidden"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 24 }}
						transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					>
						{/* Top accent bar */}
						<div className="h-[3px] w-full bg-white/20" />

						{/* Close */}
						<button
							onClick={handleClose}
							aria-label="Close"
							className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors text-lg leading-none"
						>
							✕
						</button>

						{/* Content */}
						<div className="p-10">
							<p className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase mb-3">
								PATHWAY LONDON
							</p>
							<h2 className="font-big-shoulders text-6xl font-black uppercase leading-[0.9] tracking-tight text-white mb-4">
								SIGN UP.<br />
								<span className="text-white/50">BE FIRST.</span>
							</h2>
							<p className="font-mono text-[11px] tracking-[0.15em] text-white/40 uppercase mb-8">
								New drops. Exclusive offers. No noise.
							</p>

							<div className="flex border border-white/20 focus-within:border-white/60 transition-colors">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
									placeholder="YOUR EMAIL"
									className="flex-1 bg-transparent px-4 py-3 font-mono text-xs text-white placeholder:text-white/25 outline-none tracking-widest"
									autoFocus
								/>
								<button
									onClick={handleSubmit}
									className="bg-white/10 px-5 text-white/70 text-lg hover:bg-white/20 hover:text-white transition-colors"
								>
									→
								</button>
							</div>

							<p className="font-mono text-[10px] text-white/20 tracking-wide mt-5 leading-relaxed">
								By signing up you agree to receive marketing emails from Pathway London.
								Unsubscribe at any time.
							</p>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
