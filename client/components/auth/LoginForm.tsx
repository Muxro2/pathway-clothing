// components/auth/LoginForm.tsx
"use client"
import { useState } from "react"
import { shopifyFetch } from "@/lib/shopify"

type Mode = "login" | "register"

export default function LoginForm() {
	const [mode, setMode] = useState<Mode>("login")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleLogin = async () => {
		setLoading(true)
		setError("")
		const data = await shopifyFetch(`
			mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
				customerAccessTokenCreate(input: $input) {
					customerAccessToken { accessToken expiresAt }
					customerUserErrors { message }
				}
			}
		`, { input: { email, password } })

		const result = data.data.customerAccessTokenCreate
		if (result.customerUserErrors.length > 0) {
			setError(result.customerUserErrors[0].message)
		} else {
			document.cookie = `shopify_token=${result.customerAccessToken.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`
			window.location.href = "/members"
		}
		setLoading(false)
	}

	const handleRegister = async () => {
		setLoading(true)
		setError("")
		const data = await shopifyFetch(`
			mutation customerCreate($input: CustomerCreateInput!) {
				customerCreate(input: $input) {
					customer { id }
					customerUserErrors { message }
				}
			}
		`, { input: { firstName, lastName, email, password } })
		console.log(data)
		console.log("Full response:", JSON.stringify(data, null, 2))


		const result = data.data.customerCreate
		if (result.customerUserErrors.length > 0) {
			setError(result.customerUserErrors[0].message)
		} else {
			await handleLogin()
		}
		setLoading(false)
	}

	const inputClass = "w-full bg-transparent border-b border-white/30 py-3 text-white font-mono text-sm outline-none placeholder:text-white/30 focus:border-white transition-colors"

	return (
		<div className="min-h-screen flex items-center justify-center px-6">
			<div className="w-full max-w-sm flex flex-col gap-8">

				{/* Header */}
				<div>
					<h2 className="font-big-shoulders tracking-[0.1em] uppercase">
						{mode === "login" ? "Welcome Back" : "Join Pathway"}
					</h2>
					<p className="font-mono font-thin text-sm text-white/50 mt-1">
						{mode === "login"
							? "Sign in for early access to drops and promotions."
							: "Create an account for exclusive early access."}
					</p>
				</div>

				{/* Form */}
				<div className="flex flex-col gap-6">
					{mode === "register" && (
						<div className="flex gap-4">
							<input
								type="text"
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className={inputClass}
							/>
							<input
								type="text"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className={inputClass}
							/>
						</div>
					)}
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={inputClass}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={inputClass}
					/>

					{error && (
						<p className="font-mono text-xs text-red-400">{error}</p>
					)}

					<button
						onClick={mode === "login" ? handleLogin : handleRegister}
						disabled={loading}
						className="w-full border border-white py-3 font-big-shoulders tracking-[0.1em] uppercase text-sm hover:bg-white hover:text-black transition-colors disabled:opacity-50"
					>
						{loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
					</button>
				</div>

				{/* Toggle */}
				<p className="font-mono text-xs text-white/40 text-center">
					{mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
					<button
						onClick={() => { setMode(mode === "login" ? "register" : "login"); setError("") }}
						className="text-white underline underline-offset-4"
					>
						{mode === "login" ? "Sign Up" : "Sign In"}
					</button>
				</p>

			</div>
		</div>
	)
}
