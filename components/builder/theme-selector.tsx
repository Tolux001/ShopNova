"use client"

import { useBuilderStore } from "@/lib/builder-store"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

const PRESET_THEMES = [
  {
    name: "Ocean Blue",
    primary: "#3b82f6",
    secondary: "#0ea5e9",
    accent: "#06b6d4",
  },
  {
    name: "Sunset",
    primary: "#f97316",
    secondary: "#ec4899",
    accent: "#f43f5e",
  },
  {
    name: "Forest",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    name: "Purple Dream",
    primary: "#a855f7",
    secondary: "#d946ef",
    accent: "#ec4899",
  },
]

export function ThemeSelector() {
  const { config, updateTheme } = useBuilderStore()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose a Theme</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRESET_THEMES.map((theme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="p-4 cursor-pointer hover:border-primary transition-all"
                onClick={() => updateTheme(theme)}
              >
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.primary }} />
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.secondary }} />
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.accent }} />
                  </div>
                  <p className="text-sm font-medium">{theme.name}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Or Customize</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {["primary", "secondary", "accent"].map((color) => (
            <div key={color}>
              <label className="block text-sm font-medium mb-2 capitalize">{color} Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={config.theme?.[color as keyof typeof config.theme] || "#000000"}
                  onChange={(e) =>
                    updateTheme({
                      ...config.theme,
                      [color]: e.target.value,
                    })
                  }
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={config.theme?.[color as keyof typeof config.theme] || "#000000"}
                  onChange={(e) =>
                    updateTheme({
                      ...config.theme,
                      [color]: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 bg-input border border-border rounded text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
