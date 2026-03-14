export async function shopifyFetch(query: string, variables = {}) {

	const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
	const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!

	if (!domain || !token) {
		throw new Error(`Missing env vars — domain: ${!!domain}, token: ${!!token}`)
	}
	
	const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Shopify-Storefront-Access-Token": token
		},
		body: JSON.stringify({ query, variables })
	});

	return res.json();
}