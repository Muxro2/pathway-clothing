import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/productTypes";

export default function ProductCard({ product, className }: { product: Product, className?: string}) {
return(
<Link href={`/catalog/${product.handle}`} className={`flex-shrink-0  flex flex-col text-center text-shadow-sm" ${className}`}>
	
						<Image
							src={product.images[0]?.src || "/products/white_tee.png"}
							alt={product.images[0]?.altText ?? product.title}
							width={200}
							height={300}
							sizes="40vw"
							className="w-full aspect-2/3 object-cover object-center"
						/>
	
						<h4 className="mt-4 px-2 text-[16px] font-big-shoulders font-semibold leading-[1.2em]">{product.title}</h4>
						<p className="mt-1 text-[12px] font-mono tracking-[0.1em] font-medium">£{parseFloat(product.variants[0]?.price?.amount).toFixed(2)}
							{Object.keys(product.colorSizes).length > 1 &&
							<span className="text-[10px]"><br/>
								{Object.keys(product.colorSizes).length} Colours
							</span>
							}
						</p>


					</Link>
	)
};