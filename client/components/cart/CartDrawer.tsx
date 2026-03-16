// components/cart/CartDrawer.tsx
"use client"
import { useCartStore } from "@/state/cartStore"
import { removeFromCartAction, updateCartLineAction } from "@/app/actions/cart"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
	const { cartId, checkoutUrl, lines, setCart, clearCart, setLines } = useCartStore()

	const total = lines.reduce((acc, line) => {
		return acc + parseFloat(line.merchandise.price.amount) * line.quantity
	}, 0)

	async function handleRemove(lineId: string) {
		if (!cartId) return
		const optimisticLines = lines.filter(l => l.id !== lineId)
		if (optimisticLines.length === 0) {
			clearCart()
		} else {
			setLines(optimisticLines)
		}
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
		const optimisticLines = lines.map(l =>
			l.id === lineId ? { ...l, quantity } : l
		)
		setLines(optimisticLines)
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
					className="fixed top-0 right-0 w-full md:w-[420px] z-[50] flex flex-col bg-black border-l border-white/10"
					style={{ height: 'calc(var(--vh, 1vh) * 100)' }}

				>

					{/* Header */}
					<div className="pt-24 px-6 pb-4 border-b border-white/10 flex items-center justify-between shrink-0">
						<h3 className="font-big-shoulders tracking-[0.1em] uppercase">Your Cart</h3>
						{lines.length > 0 && (
							<span className="font-mono text-[11px] text-white/40 tracking-widest">
								{lines.reduce((acc, l) => acc + l.quantity, 0)} items
							</span>
						)}
					</div>

					{lines.length === 0 ? (
						<div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
							<p className="font-mono text-sm text-white/30 tracking-widest uppercase">Your cart is empty</p>
						</div>
					) : (
						<>
							{/* Items */}
							<div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
								{lines.map((line) => (
									<div key={line.id} className="flex gap-4">

										{/* Image */}
										<div className="relative w-20 aspect-2/3 shrink-0 overflow-hidden">
											<Image
												src={line.merchandise.product.images[0]?.src || "/products/white_tee.png"}
												alt={line.merchandise.product.images[0]?.altText || line.merchandise.product.title}
												fill
												className="object-cover object-center"
											/>
										</div>

										{/* Details */}
										<div className="flex flex-col flex-1 gap-1 justify-between py-1">
											<div className="flex flex-col gap-1">
												<p className="font-big-shoulders text-[14px] tracking-[0.08em] uppercase font-semibold leading-tight">
													{line.merchandise.product.title}
												</p>
												<p className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
													{line.merchandise.title}
												</p>
												<p className="font-mono text-[12px] text-white/70">
													£{parseFloat(line.merchandise.price.amount).toFixed(2)}
												</p>
											</div>

											{/* Quantity + Remove */}
											<div className="flex items-center justify-between">
												<div className="flex items-center border border-white/20">
													<button
														onClick={() => handleUpdateQuantity(line.id, line.quantity - 1)}
														className="w-8 h-8 flex items-center justify-center font-mono text-sm hover:bg-white/10 transition-colors"
													>
														−
													</button>
													<span className="w-8 text-center font-mono text-[12px]">
														{line.quantity}
													</span>
													<button
														onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}
														className="w-8 h-8 flex items-center justify-center font-mono text-sm hover:bg-white/10 transition-colors"
													>
														+
													</button>
												</div>
												<button
													onClick={() => handleRemove(line.id)}
													className="font-mono text-[10px] text-white/30 tracking-widest uppercase hover:text-white transition-colors"
												>
													Remove
												</button>
											</div>
										</div>

									</div>
								))}
							</div>

							{/* Footer */}
							<div className="px-6 py-6 pb-10 border-t border-white/10 flex flex-col gap-4 shrink-0">
								<div className="flex justify-between items-center">
									<p className="font-mono text-[11px] text-white/40 tracking-widest uppercase">Total</p>
									<p className="font-big-shoulders text-[18px] tracking-[0.05em]">
										£{total.toFixed(2)}
									</p>
								</div>
								<p className="font-mono text-[10px] text-white/30 tracking-widest uppercase text-center">
									Shipping calculated at checkout
								</p>
								<a
									href={checkoutUrl!}
									className="w-full text-center py-4 bg-white text-black font-big-shoulders text-[13px] tracking-[0.2em] uppercase font-semibold hover:bg-white/90 transition-colors"
								>
									Checkout
								</a>
							</div>
						</>
					)}

				</motion.div>
			)}
		</AnimatePresence>
	)
}
