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
};

export type ProductVariant = {
	id: string;
	sku: string;
	price: string;
	compareAtPrice: string | null;
	inventoryQuantity: number;
	requiresShipping: boolean;
	taxable: boolean;
	options: Record<string, string>; // e.g. { Size: "M", Color: "Black" }
};

export type ProductImage = {
	src: string;
	position: number;
	altText: string | null;
};
