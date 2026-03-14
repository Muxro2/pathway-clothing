import { shopifyFetch } from "./shopify"
import { Product } from "@/types/productTypes";

export async function getProducts() {
	const data = await shopifyFetch(`
		{
  products(first: 100, sortKey: CREATED_AT, reverse: true) {
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
        variants(first: 150) {
          edges {
            node {
              id
              sku
              price { amount }
              compareAtPrice { amount }
              quantityAvailable
              requiresShipping
              taxable
              image {
                src: url
                altText
              }
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
    const variants = node.variants.edges.map((e: any) => e.node);

    const colorSizes: Record<string, string[]> = {};
    variants.forEach((variant: any) => {
      const color = variant.selectedOptions.find((o: any) => o.name === "Color")?.value;
      const size = variant.selectedOptions.find((o: any) => o.name === "Size")?.value;
      if (color && size) {
        if (!colorSizes[color]) colorSizes[color] = [];
        if (!colorSizes[color].includes(size)) colorSizes[color].push(size);
      }
    });

    return {
      ...node,
      images: node.images.edges.map((e: any) => e.node),
      variants,
      colorSizes,
    };
  });
}

export async function getProduct(handle: string) {
  const products = await getProducts();
  return products.find((p: Product) => p.handle === handle);
}

