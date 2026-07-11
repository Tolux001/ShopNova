"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { ArrowRight, Zap, Palette, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && user) {
			router.push("/dashboard");
		}
	}, [user, loading, router]);

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Navigation */}
			<nav className="border-b border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
					<div className="text-2xl font-bold gradient-text">Shop Nova</div>
					<div className="flex gap-4">
						<Link href="/auth/login">
							<Button variant="ghost">Sign In</Button>
						</Link>
						<Link href="/auth/register">
							<Button>Get Started</Button>
						</Link>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
						Build Your E-Commerce Store in Minutes
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						ShopNova is the fastest way to create a customizable e-commerce
						application. Choose your theme, select features, and launch your
						store instantly.
					</p>
					<div className="flex gap-4 justify-center">
						<Link href="/auth/register">
							<Button size="lg" className="gap-2">
								Start Building <ArrowRight className="w-4 h-4" />
							</Button>
						</Link>
						<Button size="lg" variant="outline">
							Watch Demo
						</Button>
					</div>
				</motion.div>

				{/* Features Grid */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="grid md:grid-cols-3 gap-8 mt-20">
					{[
						{
							icon: Palette,
							title: "Customizable Themes",
							description:
								"Choose from beautiful color palettes and customize every aspect of your store",
						},
						{
							icon: Layers,
							title: "Flexible Pages",
							description:
								"Select which pages you need: Home, Products, Cart, Checkout, Orders, and more",
						},
						{
							icon: Zap,
							title: "Powerful Features",
							description:
								"Add admin access, promotions, analytics, reviews, and dark mode support",
						},
					].map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
							className="bg-card border border-border rounded-lg p-6">
							<feature.icon className="w-12 h-12 text-primary mb-4" />
							<h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
							<p className="text-muted-foreground">{feature.description}</p>
						</motion.div>
					))}
				</motion.div>
			</section>

			{/* CTA Section */}
			<section className="bg-card border-t border-border py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold mb-4">
						Ready to launch your store?
					</h2>
					<p className="text-muted-foreground mb-8">
						Join thousands of entrepreneurs building their e-commerce businesses
						with ShopNova.
					</p>
					<Link href="/auth/register">
						<Button size="lg">Create Your Store Now</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
