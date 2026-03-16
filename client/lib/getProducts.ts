// lib/getProducts.ts
import { shopifyFetch } from "./shopify"
import { Product } from "@/types/productTypes";

const PRODUCT_QUERY = `
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
`

function mapProducts(data: any) {
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

// All products except early-access — used everywhere public
export async function getProducts() {
  const data = await shopifyFetch(PRODUCT_QUERY)
  return mapProducts(data).filter((p: any) => !p.tags.includes("early"))
}

// All products including early-access — used only on members page
export async function getAllProducts() {
  const data = await shopifyFetch(PRODUCT_QUERY)
  return mapProducts(data)
}

// Single product by handle — used on product page
export async function getProduct(handle: string) {
  const products = await getAllProducts()
  return products.find((p: Product) => p.handle === handle)
}
