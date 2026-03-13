import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";

import { Product } from "@/types/productTypes";

import CityBackground from "@/components/layout/CityBackground";
import ProductCard from "@/components/product/ProductCard";

  export default async function Catalog({ searchParams }: { searchParams?: Promise<{ sort?: string, category?: string }> }) {
      
      const resolvedParams = await searchParams
      const category = resolvedParams?.category ?? "all"
      const sort = resolvedParams?.sort ?? "newest"

      

    

  
  const allProducts = await getProducts();
  const products = category === "all" ? allProducts : allProducts.filter((product: Product) => product.productType === category)
  
  
  return (
    <main>
      <CityBackground />
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