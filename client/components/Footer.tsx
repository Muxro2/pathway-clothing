import Image from "next/image";

export default function Footer() {
	return (
			<footer className="relative py-4 pl-8 w-full text-[12px] text-white/60 uppercase">
				<Image
					src="/backgrounds/london.jpeg"
					alt="Hero"
					fill
					className="object-cover object-center -z-50 brightness-30 blur-xs"
					/>
			<p className="">© 2026 Pathway. All rights reserved.</p>
			<div className="w-full py-4 flex justify-between gap-4">
				<p className="flex-1">Privacy<br/>Policy</p>
				<p className="flex-1">Terms & Conditions</p>
				<p className="flex-1">Returns</p>
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
