import Image from "next/image";
import TopBar from "@/components/TopBar"

export default function NavBar() {
	return (
		<nav className="fixed w-full z-100">
			<TopBar />
			<div className="flex justify-between items-center p-4 drop-shadow-[0_4px_8px_rgba(0,0,0,.5)]">
				

					<Image
						src="/icons/menu.svg"
						alt="Menu"
						width={32}
						height={32}
						priority
					/>
			
					<a href="/" className="text-[20px]">
					<Image
						src="/images/logo.png"
						alt="Logo"
						width={120}
						height={32}
						priority
						className="object-cover aspect-2/1 "
						/>
				</a>

        <Image
						src="/icons/bag.svg"
						alt="Cart"
						width={32}
						height={32}
						priority
					/>
				
				
			</div>
		</nav>
	);
}
