import Image from "next/image";

export default function Bestseller() {
	return (
		<section id="bestseller" className="relative w-full aspect-square py-8 flex flex-col justify-end">
				<Image
					src="/images/bestseller.jpeg"
					alt="Hero"
					fill
					sizes="100vw"
					priority
					className="object-cover object-center -z-50 contrast-120 saturate-60 brightness-80"
					/>


			<h3 className="p-4 text-[32px] font-big-shoulders text-center tracking-[0.1em] font-semibold uppercase">Bestsellers</h3>
			<button className="p-4 text-[20px] font-big-shoulders tracking-[0.1em] font-semibold underline uppercase">Shop Now</button>
			
		</section>
	)
}