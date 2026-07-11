"use client"

import { useBuilderStore } from "@/lib/builder-store"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"

const FEATURES = [
  { key: "adminAccess", label: "Admin Access", description: "Manage products and orders" },
  { key: "promotions", label: "Promotions", description: "Create discounts and coupons" },
  { key: "analytics", label: "Analytics", description: "Track sales and traffic" },
  { key: "productReviews", label: "Product Reviews", description: "Customer ratings and reviews" },
  { key: "darkMode", label: "Dark Mode", description: "Dark theme support" },
]

export function FeaturesSelector() {
  const { config, updateFeatures } = useBuilderStore()

  const toggleFeature = (key: string) => {
    updateFeatures({
      ...config.features,
      [key]: !config.features?.[key as keyof typeof config.features],
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Features</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{feature.label}</p>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <Switch
                checked={config.features?.[feature.key as keyof typeof config.features] || false}
                onCheckedChange={() => toggleFeature(feature.key)}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
