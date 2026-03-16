// components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="relative overflow-hidden border-t border-white/10">
			<Image
				src="/backgrounds/london.jpeg"
				alt="London"
				fill
				className="object-cover object-center -z-50 brightness-20 blur-sm"
			/>

			<div className="px-8 py-12 flex flex-col gap-10 md:flex-row md:justify-between md:items-start">

				{/* Brand */}
				<div className="flex flex-col gap-4">
					<Image
						src="/images/logo.png"
						alt="Pathway"
						width={100}
						height={28}
						className="object-cover"
					/>
					<p className="font-mono text-[11px] text-white/30 tracking-widest uppercase max-w-[200px] leading-relaxed">
						Step. Don't Follow.
					</p>
					<div className="flex gap-4">
						<Link href="#" className="opacity-40 hover:opacity-100 transition-opacity">
							<Image src="/icons/instagram.svg" alt="Instagram" width={16} height={16} className="invert" />
						</Link>
						<Link href="#" className="opacity-40 hover:opacity-100 transition-opacity">
							<Image src="/icons/tiktok.svg" alt="TikTok" width={16} height={16} className="invert" />
						</Link>
						<Link href="#" className="opacity-40 hover:opacity-100 transition-opacity">
							<Image src="/icons/x.svg" alt="X" width={16} height={16} className="invert" />
						</Link>
					</div>
				</div>

				{/* Links */}
				<div className="flex gap-16">
					<div className="flex flex-col gap-3">
						<p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Shop</p>
						<ul className="flex flex-col gap-2">
							{["Hoodies", "Tracksuits", "Jackets", "T-Shirts", "Accessories"].map((cat) => (
								<li key={cat}>
									<Link
										href={`/catalog?category=${cat}`}
										className="font-mono text-[12px] text-white/50 tracking-widest uppercase hover:text-white transition-colors"
									>
										{cat}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="flex flex-col gap-3">
						<p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Info</p>
						<ul className="flex flex-col gap-2">
							{[
								{ label: "Privacy Policy", href: "/privacy-policy" },
								{ label: "Terms & Conditions", href: "/terms-and-conditions" },
								{ label: "Returns", href: "/returns" },
								{ label: "Members Club", href: "/members" },
							].map(({ label, href }) => (
								<li key={label}>
									<Link
										href={href}
										className="font-mono text-[12px] text-white/50 tracking-widest uppercase hover:text-white transition-colors"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

			</div>

			{/* Bottom bar */}
			<div className="px-8 py-4 border-t border-white/10 flex flex-col md:flex-row md:justify-between gap-2">
				<p className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
					© 2026 Pathway. All rights reserved.
				</p>
				<p className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
					London, UK
				</p>
			</div>

		</footer>
	);
}
