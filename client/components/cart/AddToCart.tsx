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
			className="my-4 p-4 border border-white disabled:opacity-50 transition-colors"
		>
			{loading ? "Adding..." : added ? "Added ✓" : "Add to Cart"}
		</button>
	)
}
