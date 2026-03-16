// app/members/page.tsx
import { getAllProducts } from "@/lib/getProducts"
import { Product } from "@/types/productTypes"
import ProductCard from "@/components/product/ProductCard"
import LogoutButton from "@/components/auth/LogoutButton"

export default async function MembersPage() {
  const products = await getAllProducts()
  const earlyProducts = products.filter((p: Product) => p.tags.includes("early"))

  return (
    <main>
      <div className="flex flex-col gap-12 px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Exclusive Access</p>
            <h2 className="font-big-shoulders tracking-[0.05em] uppercase leading-none">Members Only</h2>
            <p className="font-mono text-[12px] text-white/40 leading-relaxed max-w-xs">
              Early access to drops before anyone else. You're in.
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Discount Code */}
        <div className="border border-white/10 p-6 flex flex-col gap-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Exclusive Offer</p>
          <p className="font-big-shoulders text-[22px] tracking-[0.05em] uppercase leading-none">20% Off Your Order</p>
          <p className="font-mono text-[12px] text-white/40">Use code at checkout:</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="font-mono text-white border border-white/20 px-5 py-3 tracking-[0.3em] text-[13px] uppercase">
              MRSTUDIO26
            </span>
          </div>
        </div>

        {/* Early Access Products */}
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Members Drop</p>
              <h3 className="font-big-shoulders tracking-[0.05em] uppercase leading-none">Early Access</h3>
            </div>
            {earlyProducts.length > 0 && (
              <span className="font-mono text-[11px] text-white/30 tracking-widest">
                {earlyProducts.length} products
              </span>
            )}
          </div>

          {earlyProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10">
              {earlyProducts.map((product: Product, i: number) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4 border border-white/10">
              <p className="font-big-shoulders text-[24px] tracking-[0.1em] uppercase">Hold On Tight</p>
              <p className="font-mono text-[12px] text-white/30 tracking-widest text-center max-w-xs leading-relaxed">
                Something's coming. Check back soon for exclusive early access drops.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
