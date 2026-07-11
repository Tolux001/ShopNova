"use client"

import { useBuilderStore } from "@/lib/builder-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Search, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

export function EcomPreview() {
  const { config } = useBuilderStore()

  const primaryColor = config.theme?.primary || "#3b82f6"
  const secondaryColor = config.theme?.secondary || "#8b5cf6"
  const accentColor = config.theme?.accent || "#ec4899"

  const pages = Object.entries(config.pages || {})
    .filter(([_, enabled]) => enabled)
    .map(([page]) => page)

  const features = Object.entries(config.features || {})
    .filter(([_, enabled]) => enabled)
    .map(([feature]) => feature)

  const getContrastColor = (hexColor: string) => {
    const hex = hexColor.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? "#000000" : "#ffffff"
  }

  const primaryTextColor = getContrastColor(primaryColor)
  const secondaryTextColor = getContrastColor(secondaryColor)

  return (
    <div className="space-y-6">
      {/* Header Preview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden shadow-lg">
          <div className="p-6" style={{ backgroundColor: primaryColor, color: primaryTextColor }}>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{config.appName || "Your Store"}</h1>
              <div className="flex gap-4">
                <button className="hover:opacity-80 transition-opacity" aria-label="Search">
                  <Search className="w-5 h-5" />
                </button>
                <button className="hover:opacity-80 transition-opacity" aria-label="Wishlist">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="hover:opacity-80 transition-opacity" aria-label="Shopping cart">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-6 flex-wrap">
              {pages.length > 0 ? (
                pages.map((page) => (
                  <button key={page} className="capitalize hover:opacity-80 transition-opacity text-sm font-medium">
                    {page}
                  </button>
                ))
              ) : (
                <p className="text-sm opacity-75">No pages selected</p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden shadow-lg">
          <div
            className="p-12 text-center"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              color: primaryTextColor,
            }}
          >
            <h2 className="text-4xl font-bold mb-4">Welcome to {config.appName || "Your Store"}</h2>
            <p className="text-lg opacity-90 mb-6">Discover amazing products with our curated collection</p>
            <Button
              className="font-semibold"
              style={{
                backgroundColor: accentColor,
                color: getContrastColor(accentColor),
              }}
            >
              Shop Now
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Products Grid Preview */}
      {pages.includes("products") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Featured Products</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className="h-32 flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: secondaryColor, color: secondaryTextColor }}
                  >
                    Product {i}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold">Premium Product</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">High-quality item</p>
                    <p className="font-bold mb-4" style={{ color: primaryColor }}>
                      $99.99
                    </p>
                    <Button
                      size="sm"
                      className="w-full text-white font-medium"
                      style={{
                        backgroundColor: primaryColor,
                        color: primaryTextColor,
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6 shadow-lg">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}20` }}>
                <Truck className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${secondaryColor}20` }}>
                <Shield className="w-6 h-6" style={{ color: secondaryColor }} />
              </div>
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-muted-foreground">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
                <RotateCcw className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <div>
                <p className="font-semibold">Easy Returns</p>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Features Display */}
      {features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Enabled Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="p-4 rounded-lg border-2 transition-all hover:shadow-md"
                  style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}05` }}
                >
                  <p className="font-semibold capitalize">{feature}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card
          className="p-6 text-center font-semibold"
          style={{
            backgroundColor: primaryColor,
            color: primaryTextColor,
          }}
        >
          <p>&copy; 2025 {config.appName || "Your Store"}. All rights reserved.</p>
        </Card>
      </motion.div>
    </div>
  )
}
