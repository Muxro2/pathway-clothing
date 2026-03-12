import { shopifyFetch } from "./shopify"

export async function getProducts() {
	const data = await shopifyFetch(`
		{
  products(first: 100) {
    edges {
      node {
        id
        title
        handle
        description
        vendor
        productType
        tags
        availableForSale
        variants(first: 10) {
          edges {
            node {
              id
              sku
              price { amount }
              compareAtPrice { amount }
              quantityAvailable
              requiresShipping
              taxable
              selectedOptions {
                name
                value
              }
            }
          }
        }
        images(first: 10) {
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
	`);

return data.data.products.edges.map((edge: any) => {
	const node = edge.node;
	return {
		...node,
		images: node.images.edges.map((e: any) => e.node),
		variants: node.variants.edges.map((e: any) => e.node),
	};
});
}
