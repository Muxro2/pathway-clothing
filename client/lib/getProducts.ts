import { shopifyFetch } from "./shopify"

export async function getProducts() {
	const data = await shopifyFetch(`
		{
			products(first: 20) {
				edges {
					node {
						id
						title
						handle
						description
						priceRange {
							minVariantPrice {
								amount
								currencyCode
							}
						}
						images(first: 1) {
							edges {
								node {
									url
									altText
								}
							}
						}
					}
				}
			}
		}
	`);

	return data.data.products.edges.map((edge: any) => edge.node);
}