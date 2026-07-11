import { create } from "zustand"
import type { AppConfig } from "./types"

interface BuilderState {
  config: Partial<AppConfig>
  setConfig: (config: Partial<AppConfig>) => void
  updateTheme: (theme: AppConfig["theme"]) => void
  updatePages: (pages: AppConfig["pages"]) => void
  updateFeatures: (features: AppConfig["features"]) => void
  reset: () => void
}

const initialConfig: Partial<AppConfig> = {
  appName: "",
  theme: {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    accent: "#ec4899",
  },
  pages: {
    home: true,
    products: true,
    cart: true,
    checkout: true,
    orders: false,
    wishlist: false,
    dashboard: false,
    settings: false,
  },
  features: {
    adminAccess: false,
    promotions: false,
    analytics: false,
    productReviews: false,
    darkMode: true,
  },
}

export const useBuilderStore = create<BuilderState>((set) => ({
  config: initialConfig,
  setConfig: (config) => set({ config: { ...initialConfig, ...config } }),
  updateTheme: (theme) =>
    set((state) => ({
      config: { ...state.config, theme },
    })),
  updatePages: (pages) =>
    set((state) => ({
      config: { ...state.config, pages },
    })),
  updateFeatures: (features) =>
    set((state) => ({
      config: { ...state.config, features },
    })),
  reset: () => set({ config: initialConfig }),
}))
