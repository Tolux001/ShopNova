"use client"

import { useBuilderStore } from "@/lib/builder-store"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"

const PAGES = [
  { key: "home", label: "Home", description: "Landing page for your store" },
  { key: "products", label: "Products", description: "Browse and view products" },
  { key: "cart", label: "Shopping Cart", description: "Manage cart items" },
  { key: "checkout", label: "Checkout", description: "Complete purchases" },
  { key: "orders", label: "Orders", description: "View order history" },
  { key: "wishlist", label: "Wishlist", description: "Save favorite items" },
  { key: "dashboard", label: "Dashboard", description: "User account dashboard" },
  { key: "settings", label: "Settings", description: "Account settings" },
]

export function PagesSelector() {
  const { config, updatePages } = useBuilderStore()

  const togglePage = (key: string) => {
    updatePages({
      ...config.pages,
      [key]: !config.pages?.[key as keyof typeof config.pages],
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Pages</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {PAGES.map((page, index) => (
          <motion.div
            key={page.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{page.label}</p>
                <p className="text-sm text-muted-foreground">{page.description}</p>
              </div>
              <Switch
                checked={config.pages?.[page.key as keyof typeof config.pages] || false}
                onCheckedChange={() => togglePage(page.key)}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
