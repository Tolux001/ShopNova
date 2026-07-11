export interface AppConfig {
  id: string
  userId: string
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
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  displayName: string
  createdAt: Date
}
