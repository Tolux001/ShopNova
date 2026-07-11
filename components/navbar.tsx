"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { LogOut, Settings, User } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

export function Navbar() {
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await logout();
		router.push("/");
	};

	const getInitials = (email: string) => {
		return email
			.split("@")[0]
			.split(".")
			.map((part) => part[0].toUpperCase())
			.join("")
			.slice(0, 2);
	};

	return (
		<nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
				<Link
					href="/dashboard"
					className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
					<Image src="/shopnova.png" alt="Logo" width={70} height={70} />
				</Link>

				{user && (
					<div className="flex items-center gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="gap-2 hover:bg-accent/50">
									<Avatar className="h-6 w-6">
										<AvatarFallback className="text-xs font-semibold">
											{getInitials(user.email || "")}
										</AvatarFallback>
									</Avatar>
									<span className="hidden sm:inline text-sm text-muted-foreground">
										{user.email}
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href="/profile" className="cursor-pointer">
										<User className="w-4 h-4 mr-2" />
										View Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/settings" className="cursor-pointer">
										<Settings className="w-4 h-4 mr-2" />
										Settings
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleLogout}
									className="cursor-pointer text-destructive focus:text-destructive">
									<LogOut className="w-4 h-4 mr-2" />
									Sign Out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>
		</nav>
	);
}
