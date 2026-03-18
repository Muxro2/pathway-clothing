"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { shopifyFetch } from "@/lib/shopify"

type Mode = "login" | "register"

export default function LoginForm({ requestedMode }: { requestedMode?: Mode }) {
	const searchParams = useSearchParams()
	const paramMode = searchParams.get("mode") as Mode | null
	const paramEmail = searchParams.get("email") ?? ""

	const [mode, setMode] = useState<Mode>(paramMode || requestedMode || "login")
	const [email, setEmail] = useState(paramEmail)
	const [password, setPassword] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (paramMode) setMode(paramMode)
		if (paramEmail) setEmail(paramEmail)
	}, [paramMode, paramEmail])

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
		`, { input: { firstName, lastName, email, password, acceptsMarketing: true } })

		const result = data.data.customerCreate
		if (result.customerUserErrors.length > 0) {
			setError(result.customerUserErrors[0].message)
		} else {
			await handleLogin()
		}
		setLoading(false)
	}

	const inputClass = "w-full bg-transparent border-b border-white/20 py-3 font-mono text-sm text-white outline-none placeholder:text-white/25 focus:border-white transition-colors"

	return (
		<div className="min-h-screen flex items-center justify-center px-6">
			<div className="w-full max-w-sm flex flex-col gap-10">

				<div className="flex flex-col gap-2">
					<p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
						{mode === "login" ? "Welcome Back" : "New Member"}
					</p>
					<h2 className="font-big-shoulders tracking-[0.05em] uppercase leading-none">
						{mode === "login" ? "Sign In" : "Join Pathway"}
					</h2>
					<p className="font-mono text-[12px] text-white/40 leading-relaxed">
						{mode === "login"
							? "Sign in for early access to drops and promotions."
							: "Create an account for exclusive early access."}
					</p>
				</div>

				<div className="flex flex-col gap-6">
					{mode === "register" && (
						<div className="flex gap-6">
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
						placeholder="Email Address"
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
						<p className="font-mono text-[11px] text-red-400 tracking-widest">{error}</p>
					)}

					<button
						onClick={mode === "login" ? handleLogin : handleRegister}
						disabled={loading}
						className="w-full py-4 bg-white text-black font-big-shoulders text-[13px] tracking-[0.2em] uppercase font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
					>
						{loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
					</button>
				</div>

				<p className="font-mono text-[11px] text-white/30 text-center tracking-widest">
					{mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
					<button
						onClick={() => { setMode(mode === "login" ? "register" : "login"); setError("") }}
						className="text-white/60 underline underline-offset-4 hover:text-white transition-colors"
					>
						{mode === "login" ? "Sign Up" : "Sign In"}
					</button>
				</p>

			</div>
		</div>
	)
}
