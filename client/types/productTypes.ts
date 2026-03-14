export type Product = {
	id: string;
	title: string;
	handle: string;
	description: string;
	vendor: string;
	productType: string;
	tags: string[];
	status: "active" | "draft" | "archived";
	variants: ProductVariant[];
	images: ProductImage[];
	colorSizes: Record<string, string[]>;
};

export type ProductVariant = {
	id: string
	sku: string
	price: { amount: string }
	compareAtPrice: { amount: string } | null
	quantityAvailable: number
	requiresShipping: boolean
	taxable: boolean
	images?: { src: string, altText?: string }
	selectedOptions: { name: string, value: string }[]
}


export type ProductImage = {
	src: string;
	position: number;
	altText: string | null;
};
