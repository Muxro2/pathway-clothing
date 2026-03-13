// app/actions/cart.ts
"use server"
import { createCart, addToCart, removeFromCart, updateCartLine } from "@/lib/cart"

export async function addToCartAction(cartId: string | null, merchandiseId: string) {
	if (cartId) {
		return await addToCart(cartId, merchandiseId, 1)
	} else {
		const newCart = await createCart()
		return await addToCart(newCart.id, merchandiseId, 1)
	}
}

export async function removeFromCartAction(cartId: string, lineId: string) {
	return await removeFromCart(cartId, lineId)
}

export async function updateCartLineAction(cartId: string, lineId: string, quantity: number) {
	return await updateCartLine(cartId, lineId, quantity)
}
