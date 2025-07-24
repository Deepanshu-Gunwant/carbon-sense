"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ThemeToggle } from "@/components/theme-toggle"
import { Leaf, ArrowLeft, ArrowRight, CheckCircle, User, MapPin, Target, Settings } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { countriesData } from "@/lib/countries-data"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    state: "",
    city: "",
    habits: {
      transport: "",
      diet: "",
      energy: "",
      waste: "",
    },
    goals: {
      reduction: "",
      timeline: "",
      focus: [],
    },
    preferences: {
      notifications: true,
      newsletter: true,
      dataSharing: false,
    },
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", formData)
      // Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectedCountryData = countriesData.find((c) => c.name === formData.country)
  const selectedStateData = selectedCountryData?.states.find((s) => s.name === formData.state)

  const focusAreas = [
    "Transportation",
    "Energy Usage",
    "Food & Diet",
    "Waste Reduction",
    "Water Conservation",
    "Sustainable Shopping",
  ]

  const stepIcons = [User, MapPin, Target, Settings]
  const stepTitles = ["Account", "Location", "Goals", "Preferences"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">CarbonSense</span>
          </div>
          <ThemeToggle />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl mb-2">Join the Sustainability Movement</CardTitle>
              <CardDescription className="text-lg">
                Start tracking your carbon footprint and make a positive impact
              </CardDescription>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center space-x-2 mt-8">
                {[1, 2, 3, 4].map((i) => {
                  const Icon = stepIcons[i - 1]
                  return (
                    <div key={i} className="flex items-center">
                      <div
                        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          i <= step ? "bg-green-600 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                        }`}
                      >
                        {i < step ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                        {i <= step && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 rounded-full bg-green-600 opacity-20"
                          />
                        )}
                      </div>
                      {i < 4 && (
                        <div
                          className={`w-16 h-1 mx-2 transition-all duration-300 ${
                            i < step ? "bg-green-600" : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-center space-x-8 mt-4">
                {stepTitles.map((title, index) => (
                  <span
                    key={index}
                    className={`text-sm font-medium transition-colors ${
                      index + 1 <= step ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {title}
                  </span>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-8 pb-8">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Create Your Account</h3>
                    <p className="text-gray-600 dark:text-gray-300">Let's start with your basic information</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password (min. 8 characters)"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12"
                    />
                    <p className="text-sm text-gray-500">Password should be at least 8 characters long</p>
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-green-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-green-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Your Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">Help us provide accurate carbon calculations</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value, state: "", city: "" })}
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

                    {formData.country && (
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province *</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value, city: "" })}
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

                    {formData.state && (
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) => setFormData({ ...formData, city: value })}
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
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Why do we need your location?
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      We use your location to provide accurate carbon footprint calculations based on local emission
                      factors, energy sources, transportation infrastructure, and regional environmental data.
                    </p>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Set Your Goals</h3>
                    <p className="text-gray-600 dark:text-gray-300">Define your sustainability objectives</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Primary Transport Mode</Label>
                      <Select
                        value={formData.habits.transport}
                        onValueChange={(value) =>
                          setFormData({ ...formData, habits: { ...formData.habits, transport: value } })
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select transport mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Personal Car</SelectItem>
                          <SelectItem value="public">Public Transport</SelectItem>
                          <SelectItem value="bike">Bike/Walk</SelectItem>
                          <SelectItem value="mixed">Mixed Transport</SelectItem>
                          <SelectItem value="remote">Work from Home</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Diet Type</Label>
                      <Select
                        value={formData.habits.diet}
                        onValueChange={(value) =>
                          setFormData({ ...formData, habits: { ...formData.habits, diet: value } })
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select diet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="omnivore">Omnivore</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="pescatarian">Pescatarian</SelectItem>
                          <SelectItem value="flexitarian">Flexitarian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Carbon Reduction Goal</Label>
                      <Select
                        value={formData.goals.reduction}
                        onValueChange={(value) =>
                          setFormData({ ...formData, goals: { ...formData.goals, reduction: value } })
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your reduction goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">Reduce by 10% this year</SelectItem>
                          <SelectItem value="20">Reduce by 20% this year</SelectItem>
                          <SelectItem value="30">Reduce by 30% this year</SelectItem>
                          <SelectItem value="50">Reduce by 50% this year</SelectItem>
                          <SelectItem value="neutral">Achieve carbon neutrality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Focus Areas (Select all that apply)</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {focusAreas.map((area) => (
                          <div key={area} className="flex items-center space-x-2">
                            <Checkbox
                              id={area}
                              checked={formData.goals.focus.includes(area)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({
                                    ...formData,
                                    goals: {
                                      ...formData.goals,
                                      focus: [...formData.goals.focus, area],
                                    },
                                  })
                                } else {
                                  setFormData({
                                    ...formData,
                                    goals: {
                                      ...formData.goals,
                                      focus: formData.goals.focus.filter((f) => f !== area),
                                    },
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={area} className="text-sm font-normal">
                              {area}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Final Preferences</h3>
                    <p className="text-gray-600 dark:text-gray-300">Customize your experience</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Notification Preferences</h4>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <Label className="font-medium">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive updates about your progress and tips</p>
                        </div>
                        <Checkbox
                          checked={formData.preferences.notifications}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              preferences: { ...formData.preferences, notifications: checked },
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <Label className="font-medium">Newsletter Subscription</Label>
                          <p className="text-sm text-gray-500">Weekly sustainability tips and community highlights</p>
                        </div>
                        <Checkbox
                          checked={formData.preferences.newsletter}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              preferences: { ...formData.preferences, newsletter: checked },
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <Label className="font-medium">Anonymous Data Sharing</Label>
                          <p className="text-sm text-gray-500">Help improve our platform with anonymized usage data</p>
                        </div>
                        <Checkbox
                          checked={formData.preferences.dataSharing}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              preferences: { ...formData.preferences, dataSharing: checked },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🎉 You're almost ready!</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        You can always update these preferences later in your dashboard settings. Click "Create Account"
                        to start your sustainability journey!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between pt-8 border-t">
                {step > 1 && (
                  <Button variant="outline" onClick={handlePrev} className="px-8 bg-transparent">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}

                {step < 4 ? (
                  <Button
                    onClick={handleNext}
                    className="ml-auto bg-green-600 hover:bg-green-700 px-8"
                    disabled={
                      (step === 1 && (!formData.name || !formData.email || !formData.password)) ||
                      (step === 2 && (!formData.country || !formData.state || !formData.city))
                    }
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="ml-auto bg-green-600 hover:bg-green-700 px-8"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-green-600 hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
