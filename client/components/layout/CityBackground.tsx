import Image from "next/image";

export default function CityBackground({className}: {className?: string}) {
	return (
<Image
				src="/backgrounds/london.jpeg"
				alt="Hero"
				fill
				sizes="100vw"
				className={`object-cover mix-blend-hard-light brightness-95 blur-[1px] -z-50 ${className}`}
			/>
					)
				};