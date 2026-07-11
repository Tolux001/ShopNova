"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			toast({
				title: "Success",
				description: "Logged in successfully",
			});
			router.push("/dashboard");
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setLoading(true);
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			router.push("/dashboard");
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md">
				<Card className="p-8">
					<div className="mb-8">
						<h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
						<p className="text-muted-foreground">
							Sign in to your ShopNova account
						</p>
					</div>

					<form onSubmit={handleLogin} className="space-y-4 mb-6">
						<div>
							<label className="block text-sm font-medium mb-2">Email</label>
							<Input
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Password</label>
							<Input
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
					</form>

					<div className="relative mb-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-card text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>

					<Button
						type="button"
						variant="outline"
						className="w-full mb-4 bg-transparent"
						onClick={handleGoogleSignIn}
						disabled={loading}>
						Sign in with Google
					</Button>

					<p className="text-center text-sm text-muted-foreground">
						Don't have an account?{" "}
						<Link
							href="/auth/register"
							className="text-primary hover:underline">
							Create one
						</Link>
					</p>
				</Card>
			</motion.div>
		</div>
	);
}
