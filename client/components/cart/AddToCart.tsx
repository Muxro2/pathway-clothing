// components/cart/AddToCart.tsx
"use client"
import { useState } from "react"
import { useCartStore } from "@/state/cartStore"
import { addToCartAction } from "@/app/actions/cart"

export default function AddToCart({ merchandiseId }: { merchandiseId: string }) {
	const { cartId, setCart } = useCartStore()
	const [loading, setLoading] = useState(false)
	const [added, setAdded] = useState(false)

	async function handleAddToCart() {
		setLoading(true)
		setAdded(false)
		const cart = await addToCartAction(cartId, merchandiseId)
		setCart(cart.id, cart.checkoutUrl, cart.lines)
		setLoading(false)
		setAdded(true)
		setTimeout(() => setAdded(false), 2000)
	}

	return (
		<button
			onClick={handleAddToCart}
			disabled={loading}
			className="w-full py-4 bg-white text-black font-big-shoulders text-[13px] tracking-[0.2em] uppercase font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
		>
			{loading ? "Adding..." : added ? "Added ✓" : "Add to Cart"}
		</button>
	)
}
