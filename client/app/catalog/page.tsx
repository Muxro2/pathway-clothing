// app/catalog/page.tsx
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/productTypes";
import CityBackground from "@/components/layout/CityBackground";
import ProductCard from "@/components/product/ProductCard";

const categories = ["All", "Hoodies", "Tracksuits", "Jackets", "T-Shirts", "Accessories"]

export default async function Catalog({ searchParams }: { searchParams?: Promise<{ sort?: string, category?: string }> }) {

  const resolvedParams = await searchParams
  const category = resolvedParams?.category ?? "All"
  const sort = resolvedParams?.sort ?? "newest"

  const allProducts = await getProducts();
  const products = category === "All"
    ? allProducts
    : allProducts.filter((product: Product) => product.productType === category)

  return (
    <main>
      <CityBackground />

      {/* Header */}
      <div className="px-6 pt-4 pb-6 flex flex-col gap-6">

        {/* Title */}
        <div className="flex items-end justify-between">
          <h2 className="font-big-shoulders tracking-[0.1em] uppercase">
            {category === "All" ? "All Products" : category}
          </h2>
          <span className="font-mono text-[11px] text-white/30 tracking-widest">
            {products.length} products
          </span>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/catalog" : `/catalog?category=${cat}`}
              className={`shrink-0 px-4 py-2 font-mono text-[11px] tracking-widest uppercase transition-colors border ${
                category === cat || (cat === "All" && category === "All")
                  ? "border-white text-white"
                  : "border-white/20 text-white/40 hover:border-white/50 hover:text-white/70"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10">
          {products.map((product: Product, i: number) => (
            <ProductCard key={product.id} product={product} className="w-full" priority={i < 4} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="font-big-shoulders text-[24px] tracking-[0.1em] uppercase">Nothing Here Yet</p>
          <p className="font-mono text-sm text-white/30 tracking-widest">Check back soon for new drops.</p>
          <Link href="/catalog" className="mt-4 font-mono text-[11px] tracking-widest uppercase border-b border-white/30 pb-1 hover:text-white transition-colors">
            View All
          </Link>
        </div>
      )}

    </main>
  )
}
