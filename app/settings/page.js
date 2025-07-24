"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Leaf, ArrowLeft, User, MapPin, Bell, Shield, Download, Trash2, Save, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { countriesData } from "@/lib/countries-data"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "Demo User",
    email: "demo@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    achievementAlerts: true,
    communityUpdates: false,
    marketingEmails: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    dataSharing: false,
    analyticsTracking: true,
    locationTracking: true,
  })

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "location", name: "Location", icon: MapPin },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "privacy", name: "Privacy", icon: Shield },
    { id: "data", name: "Data & Export", icon: Download },
  ]

  const handleSave = async (section) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log(`Saving ${section}:`, { profileData, notificationSettings, privacySettings })
      // Show success message
    } catch (error) {
      console.error("Save error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportData = async (format) => {
    setLoading(true)
    try {
      // Simulate data export
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(`Exporting data in ${format} format`)
      // Trigger download
    } catch (error) {
      console.error("Export error:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectedCountryData = countriesData.find((c) => c.name === profileData.country)
  const selectedStateData = selectedCountryData?.states.find((s) => s.name === profileData.state)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">CarbonSense</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Account Settings</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Manage your account preferences and privacy settings
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg sticky top-8">
                <CardContent className="p-6">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-6 w-6 mr-3 text-green-600" />
                        Profile Information
                      </CardTitle>
                      <CardDescription>Update your personal information and account details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>

                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showPassword ? "text" : "password"}
                              value={profileData.currentPassword}
                              onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                              className="h-12 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              value={profileData.newPassword}
                              onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                              className="h-12"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={profileData.confirmPassword}
                              onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                              className="h-12"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleSave("profile")}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Location Settings */}
              {activeTab === "location" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-6 w-6 mr-3 text-green-600" />
                        Location Settings
                      </CardTitle>
                      <CardDescription>Update your location for accurate carbon footprint calculations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            value={profileData.country}
                            onValueChange={(value) =>
                              setProfileData({ ...profileData, country: value, state: "", city: "" })
                            }
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countriesData.map((country) => (
                                <SelectItem key={country.name} value={country.name}>
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {profileData.country && (
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Select
                              value={profileData.state}
                              onValueChange={(value) => setProfileData({ ...profileData, state: value, city: "" })}
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select your state" />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedCountryData?.states.map((state) => (
                                  <SelectItem key={state.name} value={state.name}>
                                    {state.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {profileData.state && (
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Select
                              value={profileData.city}
                              onValueChange={(value) => setProfileData({ ...profileData, city: value })}
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select your city" />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedStateData?.cities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Why Location Matters</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Your location helps us provide accurate carbon footprint calculations based on local emission
                          factors, energy sources, transportation infrastructure, and regional environmental data.
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleSave("location")}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Location
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="h-6 w-6 mr-3 text-green-600" />
                        Notification Preferences
                      </CardTitle>
                      <CardDescription>Choose what notifications you'd like to receive</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-6">
                        {[
                          {
                            key: "emailNotifications",
                            title: "Email Notifications",
                            description: "Receive important updates and alerts via email",
                          },
                          {
                            key: "pushNotifications",
                            title: "Push Notifications",
                            description: "Get real-time notifications in your browser",
                          },
                          {
                            key: "weeklyReports",
                            title: "Weekly Reports",
                            description: "Receive weekly summaries of your carbon footprint progress",
                          },
                          {
                            key: "achievementAlerts",
                            title: "Achievement Alerts",
                            description: "Get notified when you earn new badges or reach milestones",
                          },
                          {
                            key: "communityUpdates",
                            title: "Community Updates",
                            description: "Stay updated on community challenges and social features",
                          },
                          {
                            key: "marketingEmails",
                            title: "Marketing Emails",
                            description: "Receive tips, news, and promotional content",
                          },
                        ].map((setting) => (
                          <div key={setting.key} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <Label className="font-medium text-base">{setting.title}</Label>
                              <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                            </div>
                            <Switch
                              checked={notificationSettings[setting.key]}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  [setting.key]: checked,
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleSave("notifications")}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Preferences
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="h-6 w-6 mr-3 text-green-600" />
                        Privacy & Security
                      </CardTitle>
                      <CardDescription>Control your privacy settings and data sharing preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Profile Visibility</Label>
                          <Select
                            value={privacySettings.profileVisibility}
                            onValueChange={(value) =>
                              setPrivacySettings({ ...privacySettings, profileVisibility: value })
                            }
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public - Visible to all users</SelectItem>
                              <SelectItem value="friends">Friends Only - Visible to connections</SelectItem>
                              <SelectItem value="private">Private - Only visible to you</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {[
                          {
                            key: "dataSharing",
                            title: "Anonymous Data Sharing",
                            description: "Help improve our platform by sharing anonymized usage data",
                          },
                          {
                            key: "analyticsTracking",
                            title: "Analytics Tracking",
                            description: "Allow us to track your usage for analytics and improvement purposes",
                          },
                          {
                            key: "locationTracking",
                            title: "Location-Based Features",
                            description: "Enable location-based features and recommendations",
                          },
                        ].map((setting) => (
                          <div key={setting.key} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <Label className="font-medium text-base">{setting.title}</Label>
                              <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                            </div>
                            <Switch
                              checked={privacySettings[setting.key]}
                              onCheckedChange={(checked) =>
                                setPrivacySettings({
                                  ...privacySettings,
                                  [setting.key]: checked,
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Data Protection</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          Your personal data is encrypted and secure. We never sell your information to third parties.
                          Read our{" "}
                          <Link href="/privacy" className="underline">
                            Privacy Policy
                          </Link>{" "}
                          for more details.
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleSave("privacy")}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Privacy Settings
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Data & Export */}
              {activeTab === "data" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="space-y-6">
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Download className="h-6 w-6 mr-3 text-green-600" />
                          Export Your Data
                        </CardTitle>
                        <CardDescription>Download your carbon footprint data and account information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-4">
                          <Button
                            variant="outline"
                            onClick={() => handleExportData("csv")}
                            disabled={loading}
                            className="h-20 flex-col space-y-2"
                          >
                            <Download className="h-6 w-6" />
                            <span>Export as CSV</span>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleExportData("pdf")}
                            disabled={loading}
                            className="h-20 flex-col space-y-2"
                          >
                            <Download className="h-6 w-6" />
                            <span>Export as PDF</span>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleExportData("json")}
                            disabled={loading}
                            className="h-20 flex-col space-y-2"
                          >
                            <Download className="h-6 w-6" />
                            <span>Export as JSON</span>
                          </Button>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                          <h4 className="font-semibold mb-2">What's included in your export:</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <li>• Carbon footprint data and calculations</li>
                            <li>• Activity logs and tracking history</li>
                            <li>• Achievement and badge information</li>
                            <li>• Account settings and preferences</li>
                            <li>• Community interactions (if public)</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-l-4 border-l-red-500">
                      <CardHeader>
                        <CardTitle className="flex items-center text-red-600">
                          <Trash2 className="h-6 w-6 mr-3" />
                          Delete Account
                        </CardTitle>
                        <CardDescription>Permanently delete your account and all associated data</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                          <p className="text-sm text-red-700 dark:text-red-300">
                            <strong>Warning:</strong> This action cannot be undone. All your data, including carbon
                            footprint history, achievements, and account information will be permanently deleted.
                          </p>
                        </div>
                        <Button variant="destructive" className="w-full">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete My Account
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
