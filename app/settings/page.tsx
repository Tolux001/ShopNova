"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertCircle, Bell, Lock, Palette, Trash2, Check } from "lucide-react"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [saved, setSaved] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    } else if (user) {
      setDisplayName(user.displayName || "")
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

  const handleSaveChanges = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and application settings</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Account Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <Input type="email" value={user.email || ""} disabled className="bg-muted cursor-not-allowed" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Your email address is used for login and cannot be changed
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Display Name</label>
                      <Input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                        className="text-base"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        This name will be displayed on your profile and in your stores
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Account Created</label>
                      <Input
                        type="text"
                        value={
                          user.metadata?.creationTime
                            ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Not available"
                        }
                        disabled
                        className="bg-muted cursor-not-allowed"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button onClick={handleSaveChanges} className="gap-2">
                        {saved ? (
                          <>
                            <Check className="w-4 h-4" />
                            Saved
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Bell className="w-6 h-6" />
                    Notification Preferences
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card/50 transition-colors">
                      <div>
                        <p className="font-semibold">Order Updates</p>
                        <p className="text-sm text-muted-foreground">Get notified about your store orders and sales</p>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card/50 transition-colors">
                      <div>
                        <p className="font-semibold">Product Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new features and improvements
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card/50 transition-colors">
                      <div>
                        <p className="font-semibold">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive promotional offers and special deals</p>
                      </div>
                      <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card/50 transition-colors">
                      <div>
                        <p className="font-semibold">Weekly Digest</p>
                        <p className="text-sm text-muted-foreground">Get a weekly summary of your store performance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Button onClick={handleSaveChanges} className="w-full gap-2 mt-6">
                      {saved ? (
                        <>
                          <Check className="w-4 h-4" />
                          Preferences Saved
                        </>
                      ) : (
                        "Save Preferences"
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Palette className="w-6 h-6" />
                    Appearance Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-4">Theme</p>
                      <div className="grid grid-cols-3 gap-4">
                        <button className="p-4 border-2 border-primary rounded-lg bg-card hover:bg-card/80 transition-colors">
                          <div className="w-full h-20 bg-white rounded mb-2" />
                          <p className="text-sm font-medium">Light</p>
                        </button>
                        <button className="p-4 border-2 border-primary rounded-lg bg-card hover:bg-card/80 transition-colors">
                          <div className="w-full h-20 bg-slate-900 rounded mb-2" />
                          <p className="text-sm font-medium">Dark</p>
                        </button>
                        <button className="p-4 border border-border rounded-lg bg-card hover:bg-card/80 transition-colors">
                          <div className="w-full h-20 bg-gradient-to-r from-white to-slate-900 rounded mb-2" />
                          <p className="text-sm font-medium">Auto</p>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card/50 transition-colors">
                      <div>
                        <p className="font-semibold">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Enable dark mode for comfortable viewing</p>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card/50 transition-colors">
                      <div>
                        <p className="font-semibold">Compact View</p>
                        <p className="text-sm text-muted-foreground">
                          Use a more compact layout for better space usage
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <Button onClick={handleSaveChanges} className="w-full gap-2 mt-6">
                      {saved ? (
                        <>
                          <Check className="w-4 h-4" />
                          Appearance Saved
                        </>
                      ) : (
                        "Save Appearance"
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="p-8 mb-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Lock className="w-6 h-6" />
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-4">Password</p>
                      <p className="text-sm text-muted-foreground mb-4">Last changed 3 months ago</p>
                      <Button variant="outline" className="bg-transparent">
                        Change Password
                      </Button>
                    </div>

                    <div className="border-t border-border pt-6">
                      <p className="font-semibold mb-4">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <Button variant="outline" className="bg-transparent">
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="border-t border-border pt-6">
                      <p className="font-semibold mb-4">Active Sessions</p>
                      <p className="text-sm text-muted-foreground mb-4">Manage your active login sessions</p>
                      <div className="space-y-2">
                        <div className="p-3 bg-card border border-border rounded-lg text-sm">
                          <p className="font-medium">Current Session</p>
                          <p className="text-muted-foreground text-xs">Last active: Just now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Danger Zone */}
                <Card className="p-8 border-destructive/50 bg-destructive/5">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-destructive mb-2">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="gap-2">
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Account</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove all
                              your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex gap-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Delete Account
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
