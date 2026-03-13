import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
			<footer className="relative py-4 pl-8 w-full text-[12px] text-white/60 uppercase overflow-hidden">
				<Image
					src="/backgrounds/london.jpeg"
					alt="Hero"
					fill
					className="object-cover object-center -z-50 brightness-30 blur-xs"
					/>
			<h5 className="">© 2026 Pathway. All rights reserved.</h5>
			<div className="w-full py-4 flex justify-between gap-4">
				<Link href="/privacy-policy" className="flex-1">Privacy<br/>Policy</Link>
				<Link href="/terms-and-conditions" className="flex-1">
				Terms & Conditions
				</Link>
				<Link href="/returns" className="flex-1">
				Returns
					</Link>
			</div>

				<div className="flex gap-4 opacity-60">
					<Image
						src="/icons/instagram.svg"
						alt="Facebook"
						width={18}
						height={18}
						priority
						className="invert"
					/>
					<Image
						src="/icons/tiktok.svg"
						alt="Facebook"
						width={18}
						height={18}
						priority
						className="invert"
					/>
					<Image
						src="/icons/x.svg"
						alt="Facebook"
						width={18}
						height={18}
						priority
						className="invert"
					/>
				</div>
			</footer>
	);
}
