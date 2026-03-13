import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/productTypes";

export default function ProductCard({ product }: { product: Product }) {
return(
<Link href={`/catalog/${product.handle}`} className="flex-shrink-0 w-[40%] flex flex-col text-center text-shadow-sm">
	
						<Image
							src={product.images[0]?.src || "/products/white_tee.png"}
							alt={product.images[0]?.altText ?? product.title}
							width={200}
							height={300}
							className="w-full aspect-2/3 object-cover object-center"
						/>
	
						<h4 className="mt-2 text-[18px] font-big-shoulders tracking-[0.1em] font-semibold">{product.title}</h4>
						<p className="mt-1 text-[12px] font-mono tracking-[0.1em] font-medium">£{parseFloat(product.variants[0]?.price?.amount).toFixed(2)}</p>


					</Link>
	)
};