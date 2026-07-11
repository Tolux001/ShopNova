"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useBuilderStore } from "@/lib/builder-store"
import { Navbar } from "@/components/navbar"
import { EcomPreview } from "@/components/preview/ecom-preview"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Copy, Check } from "lucide-react"
import { motion } from "framer-motion"

export default function PreviewPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { config } = useBuilderStore()
  const [copied, setCopied] = useState(false)

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

  const handleCopyConfig = () => {
    const configJson = JSON.stringify(config, null, 2)
    navigator.clipboard.writeText(configJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Preview Your Store</h1>
              <p className="text-muted-foreground">See how your e-commerce store will look with your custom theme</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link href="/builder">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowLeft className="w-4 h-4" />
                  Edit
                </Button>
              </Link>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Deploy Store
              </Button>
            </div>
          </div>

          <EcomPreview />

          {/* Configuration Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Configuration Details</h2>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleCopyConfig}>
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Config
                    </>
                  )}
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Store Name */}
                <div>
                  <h3 className="font-semibold mb-4">Store Name</h3>
                  <p className="text-muted-foreground">{config.appName || "Not set"}</p>
                </div>

                {/* Theme Colors */}
                <div>
                  <h3 className="font-semibold mb-4">Theme Colors</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded border border-border"
                        style={{ backgroundColor: config.theme?.primary }}
                      />
                      <span className="text-sm text-muted-foreground">Primary: {config.theme?.primary}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded border border-border"
                        style={{ backgroundColor: config.theme?.secondary }}
                      />
                      <span className="text-sm text-muted-foreground">Secondary: {config.theme?.secondary}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded border border-border"
                        style={{ backgroundColor: config.theme?.accent }}
                      />
                      <span className="text-sm text-muted-foreground">Accent: {config.theme?.accent}</span>
                    </div>
                  </div>
                </div>

                {/* Pages & Features Count */}
                <div>
                  <h3 className="font-semibold mb-4">Summary</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Pages: {Object.values(config.pages || {}).filter(Boolean).length}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Features: {Object.values(config.features || {}).filter(Boolean).length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Lists */}
              <div className="grid md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-border">
                <div>
                  <h3 className="font-semibold mb-4">Pages Included</h3>
                  <ul className="space-y-2">
                    {Object.entries(config.pages || {})
                      .filter(([_, enabled]) => enabled)
                      .map(([page]) => (
                        <li key={page} className="text-muted-foreground capitalize flex items-center gap-2">
                          <span className="text-primary">✓</span> {page}
                        </li>
                      ))}
                    {Object.values(config.pages || {}).filter(Boolean).length === 0 && (
                      <li className="text-muted-foreground text-sm">No pages selected</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Features Enabled</h3>
                  <ul className="space-y-2">
                    {Object.entries(config.features || {})
                      .filter(([_, enabled]) => enabled)
                      .map(([feature]) => (
                        <li key={feature} className="text-muted-foreground capitalize flex items-center gap-2">
                          <span className="text-primary">✓</span> {feature}
                        </li>
                      ))}
                    {Object.values(config.features || {}).filter(Boolean).length === 0 && (
                      <li className="text-muted-foreground text-sm">No features enabled</li>
                    )}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
