import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";

import { Product } from "@/types/productTypes";

export default async function Catalog() {
  const products = await getProducts()

  
  return (
    <main className="relative w-full pt-24">
      <Image
				src="/backgrounds/london.jpeg"
				alt="Hero"
				height={1000}
        width={1000}
				className="fixed top-0 w-screen h-screen object-cover brightness-100  -z-50 mix-blend-hard-light blur-[2px]"
				/>
      <h2 className="text-[32px] ml-4 py-4">New Arrivals</h2>
    <button className="ml-4 border-1 border-white text-white px-4 py-2">Filter</button>
      <div className="my-4 grid grid-cols-2 gap-y-8">
        {products.map((product: Product) => (
      <Link href={`/catalog/${product.handle}`} key={product.id} className="flex-shrink-0 w-full p-2 flex flex-col gap-2 text-center">
						<Image
							src={product.images[0]?.src || "/products/white_tee.png"}
							alt={product.images[0]?.altText ?? product.title}
							width={400}
							height={400}
							className="w-full aspect-2/3 object-cover object-center"
						/>
						<h4 className="text-[20px] font-big-shoulders tracking-[0.1em] font-semibold">{product.title}</h4>
						<p className="font-mono font-thin">£{parseFloat(product.variants[0]?.price.amount).toFixed(2)}</p>


					</Link>
        ))}
      </div>
    </main>
  );
}