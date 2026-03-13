// state/cartStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartLine = {
	id: string
	quantity: number
	merchandise: {
		id: string
		title: string
		price: { amount: string }
		product: {
			title: string
			images: { src: string, altText: string }[]
		}
	}
}

type CartStore = {
	cartId: string | null
	checkoutUrl: string | null
	lines: CartLine[]
	setCart: (cartId: string, checkoutUrl: string, lines: CartLine[]) => void
	clearCart: () => void
}

export const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			cartId: null,
			checkoutUrl: null,
			lines: [],
			setCart: (cartId, checkoutUrl, lines) => set({ cartId, checkoutUrl, lines }),
			clearCart: () => set({ cartId: null, checkoutUrl: null, lines: [] })
		}),
		{ name: "shopify-cart" }
	)
)
