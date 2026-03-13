"use client"
import { useCartStore } from "@/state/cartStore"
import { removeFromCartAction, updateCartLineAction } from "@/app/actions/cart"
import Image from "next/image"

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
	const { cartId, checkoutUrl, lines, setCart, clearCart } = useCartStore()

	const total = lines.reduce((acc, line) => {
		return acc + parseFloat(line.merchandise.price.amount) * line.quantity
	}, 0)

	async function handleRemove(lineId: string) {
		if (!cartId) return
		const cart = await removeFromCartAction(cartId, lineId)
		if (cart.lines.length === 0) {
			clearCart()
		} else {
			setCart(cart.id, cart.checkoutUrl, cart.lines)
		}
	}

	async function handleUpdateQuantity(lineId: string, quantity: number) {
		if (!cartId) return
		if (quantity === 0) {
			handleRemove(lineId)
			return
		}
		const cart = await updateCartLineAction(cartId, lineId, quantity)
		setCart(cart.id, cart.checkoutUrl, cart.lines)
	}

	if (!isOpen) return null

	return (
		<>
			<div onClick={onClose} className="fixed inset-0 z-100" />

			<div className="fixed right-0 top-0 h-screen w-80 bg-black z-100 flex flex-col">

				<div className="flex justify-between items-center p-4">
					<h3>Your Cart</h3>
					<button onClick={onClose}>✕</button>
				</div>

				{lines.length === 0 ? (
					<div className="flex-1 flex items-center justify-center">
						<p>Your cart is empty</p>
					</div>
				) : (
					<>
						<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
							{lines.map((line) => (
								<div key={line.id} className="flex gap-4">
									<Image
										src={line.merchandise.product.images[0]?.src || "/products/white_tee.png"}
										alt={line.merchandise.product.images[0]?.altText || line.merchandise.product.title}
										width={80}
										height={80}
										className="object-cover"
									/>
									<div className="flex flex-col flex-1 gap-1">
										<p>{line.merchandise.product.title}</p>
										<p>{line.merchandise.title}</p>
										<p>£{parseFloat(line.merchandise.price.amount).toFixed(2)}</p>
										<div className="flex items-center gap-2">
											<button onClick={() => handleUpdateQuantity(line.id, line.quantity - 1)}>-</button>
											<span>{line.quantity}</span>
											<button onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}>+</button>
										</div>
									</div>
									<button onClick={() => handleRemove(line.id)}>Remove</button>
								</div>
							))}
						</div>

						<div className="p-4 flex flex-col gap-4">
							<div className="flex justify-between">
								<p>Total</p>
								<p>£{total.toFixed(2)}</p>
							</div>
							<a href={checkoutUrl!} className="w-full text-center py-3 bg-white text-black">
								Checkout
							</a>
						</div>
					</>
				)}
			</div>
		</>
	)
}
