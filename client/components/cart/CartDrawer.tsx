"use client"
import { useCartStore } from "@/state/cartStore"
import { removeFromCartAction, updateCartLineAction } from "@/app/actions/cart"
import { motion, AnimatePresence } from "framer-motion"
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

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ x: "100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: "100%", opacity: 0 }}
					transition={{ type: "tween", duration: 0.3 }}
					className="fixed top-0 w-full">
					<main className="cart pt-32 px-4 w-full z-90 h-[100dvh] bg-black flex flex-col">

						<div className="flex justify-center items-center p-4">
							<h3>Your Cart</h3>
						</div>

						{lines.length === 0 ? (
							<div className="flex-1 flex items-center justify-center">
								<p>Your cart is empty</p>
							</div>
						) : (
							<>
								{/* scrollable items */}
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

								{/* sticky bottom */}
								<div className="p-4 flex flex-col gap-4 border-t border-white/10">
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
					</main>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
