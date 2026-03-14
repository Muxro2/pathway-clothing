import Image from "next/image";
import Link from "next/link";

export default function Member() {
	return (
		<section id="bestseller" className="relative w-full aspect-square py-8 flex flex-col shadow-lg">
				<Image
					src="/images/vip.jpeg"
					alt="Hero"
					fill
					sizes="100vw"
					priority
					className="object-cover object-center brightness-80 -z-50"
					/>

<div className="flex flex-col gap-4">
			<h3 className="pt-8 pb-4 text-[32px] font-big-shoulders text-center tracking-[0.1em] leading-none font-semibold uppercase">Members Club</h3>
			<p className="mx-4 text-[20px] font-big-shoulders text-center tracking-[0.1em] leading-none font-semibold uppercase">Join our members club and get exclusive deals, preorders, and more VIP services.</p>
			<Link href="/login" className="p-4 text-[20px] font-big-shoulders tracking-[0.1em] leading-none font-semibold underline uppercase">Login</Link>
			<p className="text-[20px] font-big-shoulders text-center tracking-[0.1em] leading-none font-semibold uppercase">or</p>
				<input className="mx-8 p-4 text-[20px] font-big-shoulders text-center tracking-[0.1em] font-semibold uppercase backdrop-blur-sm shadow-xl" placeholder="Enter your email address"/>
				<Link href="/login" className="p-4 text-[20px] font-big-shoulders tracking-[0.1em] leading-none font-semibold underline uppercase">Sign Up</Link>
</div>
			
			
		</section>
	)
}