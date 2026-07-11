"use client"

import { create } from "zustand"

export interface BuilderConfig {
  appName: string
  theme: {
    primary: string
    secondary: string
    accent: string
  }
  pages: {
    home: boolean
    products: boolean
    cart: boolean
    checkout: boolean
    orders: boolean
    wishlist: boolean
    dashboard: boolean
    settings: boolean
  }
  features: {
    adminAccess: boolean
    promotions: boolean
    analytics: boolean
    productReviews: boolean
    darkMode: boolean
  }
}

interface BuilderStore {
  config: BuilderConfig
  setConfig: (config: BuilderConfig) => void
  updateTheme: (theme: Partial<BuilderConfig["theme"]>) => void
  updatePages: (pages: Partial<BuilderConfig["pages"]>) => void
  updateFeatures: (features: Partial<BuilderConfig["features"]>) => void
  resetConfig: () => void
}

const defaultConfig: BuilderConfig = {
  appName: "",
  theme: {
    primary: "#3b82f6",
    secondary: "#0ea5e9",
    accent: "#06b6d4",
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

export const useBuilderStore = create<BuilderStore>((set) => ({
  config: defaultConfig,
  setConfig: (config) => set({ config }),
  updateTheme: (theme) =>
    set((state) => ({
      config: {
        ...state.config,
        theme: { ...state.config.theme, ...theme },
      },
    })),
  updatePages: (pages) =>
    set((state) => ({
      config: {
        ...state.config,
        pages: { ...state.config.pages, ...pages },
      },
    })),
  updateFeatures: (features) =>
    set((state) => ({
      config: {
        ...state.config,
        features: { ...state.config.features, ...features },
      },
    })),
  resetConfig: () => set({ config: defaultConfig }),
}))
