"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

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

  // Get user initials for avatar
  const getInitials = (email: string) => {
    return email
      .split("@")[0]
      .split(".")
      .map((part) => part[0].toUpperCase())
      .join("")
      .slice(0, 2)
  }

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return "Not available"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground mb-12">Manage your account information and preferences</p>

          {/* Profile Header Card */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">{getInitials(user.email || "")}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{user.email}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Active</Badge>
                  <Badge variant="outline">Email Verified</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Account created on{" "}
                  {formatDate(user.metadata?.creationTime ? new Date(user.metadata.creationTime) : null)}
                </p>
              </div>

              <Button variant="outline">Edit Profile</Button>
            </div>
          </Card>

          {/* Account Information */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Email Address</h3>
                    <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                    <Button size="sm" variant="outline">
                      Change Email
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Account Created */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-accent mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Account Created</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {formatDate(user.metadata?.creationTime ? new Date(user.metadata.creationTime) : null)}
                    </p>
                    <Button size="sm" variant="outline" disabled>
                      View History
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Password</h3>
                    <p className="text-sm text-muted-foreground mb-4">Last changed 3 months ago</p>
                    <Button size="sm" variant="outline">
                      Change Password
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-500 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Account Status</h3>
                    <p className="text-sm text-muted-foreground mb-4">Your account is active and in good standing</p>
                    <Button size="sm" variant="outline" disabled>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <Card className="p-6 border-destructive/50 bg-destructive/5">
              <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
