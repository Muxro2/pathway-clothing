// lib/cart.ts
import { shopifyFetch } from "./shopify"

const flattenLines = (lines: any) =>
	lines.edges.map((e: any) => ({
		...e.node,
		merchandise: {
			...e.node.merchandise,
			product: {
				...e.node.merchandise.product,
				images: e.node.merchandise.product.images.edges.map((i: any) => i.node)
			}
		}
	}))

export async function createCart() {
	const data = await shopifyFetch(`
		mutation {
			cartCreate {
				cart {
					id
					checkoutUrl
					lines(first: 10) {
						edges {
							node {
								id
								quantity
								merchandise {
									... on ProductVariant {
										id
										title
										price { amount }
										product {
											title
											images(first: 1) {
												edges {
													node {
														src: url
														altText
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`)

	const cart = data.data.cartCreate.cart
	return { ...cart, lines: flattenLines(cart.lines) }
}

export async function addToCart(cartId: string, merchandiseId: string, quantity: number) {
	const data = await shopifyFetch(`
		mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
			cartLinesAdd(cartId: $cartId, lines: $lines) {
				cart {
					id
					checkoutUrl
					lines(first: 10) {
						edges {
							node {
								id
								quantity
								merchandise {
									... on ProductVariant {
										id
										title
										price { amount }
										product {
											title
											images(first: 1) {
												edges {
													node {
														src: url
														altText
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`, { cartId, lines: [{ merchandiseId, quantity }] })

	const cart = data.data.cartLinesAdd.cart
	return { ...cart, lines: flattenLines(cart.lines) }
}

export async function removeFromCart(cartId: string, lineId: string) {
	const data = await shopifyFetch(`
		mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
			cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
				cart {
					id
					checkoutUrl
					lines(first: 10) {
						edges {
							node {
								id
								quantity
								merchandise {
									... on ProductVariant {
										id
										title
										price { amount }
										product {
											title
											images(first: 1) {
												edges {
													node {
														src: url
														altText
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`, { cartId, lineIds: [lineId] })

	const cart = data.data.cartLinesRemove.cart
	return { ...cart, lines: flattenLines(cart.lines) }
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
	const data = await shopifyFetch(`
		mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
			cartLinesUpdate(cartId: $cartId, lines: $lines) {
				cart {
					id
					checkoutUrl
					lines(first: 10) {
						edges {
							node {
								id
								quantity
								merchandise {
									... on ProductVariant {
										id
										title
										price { amount }
										product {
											title
											images(first: 1) {
												edges {
													node {
														src: url
														altText
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`, { cartId, lines: [{ id: lineId, quantity }] })

	const cart = data.data.cartLinesUpdate.cart
	return { ...cart, lines: flattenLines(cart.lines) }
}

export async function getCart(cartId: string) {
	const data = await shopifyFetch(`
		query getCart($cartId: ID!) {
			cart(id: $cartId) {
				id
				checkoutUrl
				lines(first: 10) {
					edges {
						node {
							id
							quantity
							merchandise {
								... on ProductVariant {
									id
									title
									price { amount }
									product {
										title
										images(first: 1) {
											edges {
												node {
													src: url
													altText
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`, { cartId })

	const cart = data.data.cart
	return { ...cart, lines: flattenLines(cart.lines) }
}
