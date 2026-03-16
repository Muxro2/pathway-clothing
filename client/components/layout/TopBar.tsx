// components/layout/TopBar.tsx
import Image from "next/image";

export default function TopBar() {
	return (
		<div className="w-full py-2 bg-white text-black z-100">
			<p className="font-mono text-[10px] text-center tracking-[0.3em] uppercase">
				Free Shipping Over £100
			</p>
		</div>
	);
}
