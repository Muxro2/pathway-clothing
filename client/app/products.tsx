import Link from "next/link";
import { getProducts } from "@/lib/getProducts";

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: { node: { url: string; altText: string } }[];
  };
};

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <div>
      {products.map((product: Product) => {
        const image = product.images.edges[0]?.node;
        const { amount, currencyCode } = product.priceRange.minVariantPrice;
        const price = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currencyCode,
        }).format(parseFloat(amount));

        return (
          <Link key={product.id} href={`/products/${product.handle}`}>
            <div>
              {image && <img src={image.url} alt={image.altText || product.title} />}
              <h2>{product.title}</h2>
              <p>{price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}