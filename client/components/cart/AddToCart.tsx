"use client"
import { useCartStore } from "@/state/cartStore"
import { addToCartAction } from "@/app/actions/cart"

export default function AddToCart({ merchandiseId }: { merchandiseId: string }) {
	const { cartId, setCart } = useCartStore()

	async function handleAddToCart() {
		const cart = await addToCartAction(cartId, merchandiseId)
		setCart(cart.id, cart.checkoutUrl, cart.lines)
	}

	return (
		<button onClick={handleAddToCart}>
			Add to Cart
		</button>
	)
}
