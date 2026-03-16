// Member.tsx
import Image from "next/image";
import Link from "next/link";

export default function Member() {
	return (
		<section id="members" className="relative w-full md:h-[70vh] aspect-square md:aspect-auto overflow-hidden">
			<Image
				src="/images/vip.jpeg"
				alt="Members Club"
				fill
				sizes="100vw"
				priority
				className="object-cover object-center brightness-60"
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

			<div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 gap-4 md:max-w-lg">
				<p className="font-mono text-xs tracking-[0.3em] text-white/60 uppercase">Exclusive Access</p>
				<h3 className="tracking-[0.05em] uppercase leading-none">Members Club</h3>
				<p className="font-mono text-sm text-white/60 leading-relaxed">
					Early access to drops, exclusive deals, and VIP services.
				</p>
				<div className="flex gap-4 items-center pt-2">
					<Link
						href="/login"
						className="font-big-shoulders text-[13px] tracking-[0.2em] uppercase py-3 px-6 border border-white hover:bg-white hover:text-black transition-colors"
					>
						Join Now
					</Link>
					<Link
						href="/login"
						className="font-big-shoulders text-[13px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors border-b border-white/30 pb-1"
					>
						Sign In
					</Link>
				</div>
			</div>
		</section>
	)
}
