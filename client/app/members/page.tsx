// app/members/page.tsx
import { getProducts } from "@/lib/getProducts"
import { Product } from "@/types/productTypes"
import ProductCard from "@/components/product/ProductCard"
import LogoutButton from "@/components/auth/LogoutButton"

export default async function MembersPage() {
  const products = await getProducts()
  const earlyProducts = products.filter((p: Product) => p.tags.includes("early"))

  return (
    <main>
      <div className="flex flex-col gap-12 px-6 py-12">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="font-big-shoulders tracking-[0.1em] uppercase">Members Only</h2>
            <p className="font-mono font-thin text-sm text-white/50 max-w-sm">
              Early access to drops before anyone else. You're in.
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Discount Code */}
        <div className="border border-white/20 p-6 flex flex-col gap-2">
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest">Exclusive Offer</p>
          <p className="font-big-shoulders text-[20px] tracking-[0.1em]">20% Off Your Order</p>
          <p className="font-mono text-sm text-white/50">Use code at checkout:</p>
          <span className="font-mono text-white border border-white/30 px-4 py-2 w-fit tracking-[0.2em] text-sm">
            MRSTUDIO26
          </span>
        </div>

        {/* Early Access Products */}
        <div className="flex flex-col gap-6">
          <h3 className="font-big-shoulders tracking-[0.1em] uppercase text-[20px]">Early Access Drops</h3>

          {earlyProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {earlyProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 py-12 items-center text-center">
              <p className="font-big-shoulders text-[24px] tracking-[0.1em]">Hold On Tight</p>
              <p className="font-mono font-thin text-sm text-white/40 max-w-xs">
                Something's coming. Check back soon for exclusive early access drops.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
