import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";

import { Product } from "@/types/productTypes";

import ProductCard from "@/components/product/ProductCard";

  export default async function Catalog({ searchParams }: { searchParams?: Promise<{ sort?: string, category?: string }> }) {
    
    export default async function Catalog({ searchParams }: { searchParams?: Promise<{ sort?: string, category?: string }> }) {
      
      const resolvedParams = await searchParams
      const category = resolvedParams?.category ?? "all"
      const sort = resolvedParams?.sort ?? "newest"

      

    

  
  const allProducts = await getProducts();
  const products = category === "all" ? allProducts : allProducts.filter((product: Product) => product.productType === category)
  
  
  return (
    <main>
      <Image
				src="/backgrounds/london.jpeg"
				alt="Hero"
				height={1000}
        width={1000}
				className="fixed top-0 w-screen h-screen object-cover brightness-100  -z-50 mix-blend-hard-light blur-[2px]"
				/>
      <h2 className="text-[32px] ml-4 py-4">{category}</h2>
    <button className="ml-4 border-1 border-white text-white px-4 py-2">Filter</button>
      <div className="my-4 px-2 grid grid-cols-2 gap-x-2 gap-y-8">
        {products.map((product: Product) => (
      <ProductCard key={product.id} product={product} className="w-full"/>
        ))}
      </div>
    </main>
  );
}