import Image from "next/image";
import { getProducts } from "@/lib/getProducts";

	export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
		const { handle } = await params;
		const products = await getProducts();
		const product = products.find((p: Product) => p.handle === handle);


	
	if (!product) return <p className="pt-24">Product not found</p>;

	return (
			<main className="relative w-full pt-24">
				<Image
					src="/backgrounds/london.jpeg"
					alt="Hero"
					height={1000}
					width={1000}
					className="fixed top-0 w-screen h-screen object-cover brightness-100  -z-50 mix-blend-hard-light blur-[2px]"
					/>
					<Image
						src={product.images[0]?.src || "/products/white_tee.png"}
						alt={product.images[0]?.altText ?? product.title}
						width={200}
						height={300}
						className="mx-auto w-[70%] aspect-2/3 object-cover object-center"
					/>
					<h4 className="text-[20px] font-big-shoulders tracking-[0.1em] font-semibold">{product.title}</h4>
					<p className="font-mono font-thin">£{parseFloat(product.variants[0]?.price.amount).toFixed(2)}</p>
					
				
		</main>
		 );
	}
			
