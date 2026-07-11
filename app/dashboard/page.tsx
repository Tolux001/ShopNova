"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Zap, Settings } from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.email?.split("@")[0]}!</h1>
            <p className="text-muted-foreground">Create and manage your e-commerce stores</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Create New App Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/builder">
                <Card className="p-8 cursor-pointer hover:border-primary transition-colors h-full flex flex-col items-center justify-center text-center">
                  <Plus className="w-16 h-16 text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Create New Store</h2>
                  <p className="text-muted-foreground">
                    Build your customized e-commerce store with our interactive builder
                  </p>
                </Card>
              </Link>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Quick Start</h3>
                    <p className="text-sm text-muted-foreground mb-4">Get started with our pre-configured templates</p>
                    <Button size="sm" variant="outline">
                      Browse Templates
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Settings className="w-8 h-8 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Account Settings</h3>
                    <p className="text-sm text-muted-foreground mb-4">Manage your profile and preferences</p>
                    <Link href="/settings">
                      <Button size="sm" variant="outline">
                        Go to Settings
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
