"use client"

import { useBuilderStore } from "@/lib/builder-store"
import { Input } from "@/components/ui/input"

export function AppNameInput() {
  const { config, setConfig } = useBuilderStore()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">App Name</h3>
      <div>
        <label className="block text-sm font-medium mb-2">Store Name</label>
        <Input
          placeholder="My Awesome Store"
          value={config.appName || ""}
          onChange={(e) => setConfig({ ...config, appName: e.target.value })}
          className="text-lg"
        />
        <p className="text-sm text-muted-foreground mt-2">This will be displayed as your store's title</p>
      </div>
    </div>
  )
}
