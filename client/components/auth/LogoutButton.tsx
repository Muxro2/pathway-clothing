"use client"

export default function LogoutButton() {
	const handleLogout = () => {
		document.cookie = "shopify_token=; path=/; max-age=0"
		localStorage.removeItem("pathway_newsletter_timer")
		window.location.href = "/"
	}

	return (
		<button
			onClick={handleLogout}
			className="font-mono text-xs text-white/40 border border-white/20 px-4 py-2 hover:border-white hover:text-white transition-colors"
		>
			Sign Out
		</button>
	)
}
