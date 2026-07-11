"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useBuilderStore } from "@/lib/builder-store"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AppNameInput } from "@/components/builder/app-name-input"
import { ThemeSelector } from "@/components/builder/theme-selector"
import { PagesSelector } from "@/components/builder/pages-selector"
import { FeaturesSelector } from "@/components/builder/features-selector"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const STEPS = [
  { id: "name", title: "App Name", component: AppNameInput },
  { id: "theme", title: "Choose Theme", component: ThemeSelector },
  { id: "pages", title: "Select Pages", component: PagesSelector },
  { id: "features", title: "Add Features", component: FeaturesSelector },
]

export default function BuilderPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { config } = useBuilderStore()
  const [currentStep, setCurrentStep] = useState(0)

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

  const CurrentComponent = STEPS[currentStep].component

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/preview")
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 h-1 mx-1 rounded-full transition-colors ${
                  index <= currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {STEPS.length}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-8">{STEPS[currentStep].title}</h2>
                <CurrentComponent />
              </motion.div>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button onClick={handleNext} className="gap-2 ml-auto">
                {currentStep === STEPS.length - 1 ? "Preview" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div>
            <Card className="p-6 sticky top-8">
              <h3 className="font-semibold mb-4">Configuration Summary</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Store Name</p>
                  <p className="font-medium truncate">{config.appName || "Not set"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2">Theme Colors</p>
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded border border-border"
                      style={{ backgroundColor: config.theme?.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded border border-border"
                      style={{ backgroundColor: config.theme?.secondary }}
                    />
                    <div
                      className="w-8 h-8 rounded border border-border"
                      style={{ backgroundColor: config.theme?.accent }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Pages Selected</p>
                  <p className="font-medium">{Object.values(config.pages || {}).filter(Boolean).length} pages</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Features Enabled</p>
                  <p className="font-medium">{Object.values(config.features || {}).filter(Boolean).length} features</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
