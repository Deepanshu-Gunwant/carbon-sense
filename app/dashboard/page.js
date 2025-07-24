"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Leaf,
  TrendingDown,
  Award,
  Users,
  Settings,
  Plus,
  Car,
  Zap,
  Utensils,
  Trash2,
  BarChart3,
  Share2,
  MessageSquare,
  Heart,
  Mail,
  Bell,
  Target,
  Calendar,
  Globe,
  Menu,
  X,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const [currentStreak, setCurrentStreak] = useState(7)
  const [totalFootprint, setTotalFootprint] = useState(2.4)
  const [goalProgress, setGoalProgress] = useState(65)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const emissionData = [
    { month: "Jan", emissions: 3.2, target: 3.0 },
    { month: "Feb", emissions: 2.8, target: 2.9 },
    { month: "Mar", emissions: 2.5, target: 2.8 },
    { month: "Apr", emissions: 2.3, target: 2.7 },
    { month: "May", emissions: 2.1, target: 2.6 },
    { month: "Jun", emissions: 2.4, target: 2.5 },
  ]

  const weeklyData = [
    { day: "Mon", emissions: 0.3 },
    { day: "Tue", emissions: 0.4 },
    { day: "Wed", emissions: 0.2 },
    { day: "Thu", emissions: 0.5 },
    { day: "Fri", emissions: 0.3 },
    { day: "Sat", emissions: 0.6 },
    { day: "Sun", emissions: 0.1 },
  ]

  const categoryData = [
    { name: "Transport", value: 45, color: "#ef4444", amount: 1.08 },
    { name: "Energy", value: 30, color: "#f59e0b", amount: 0.72 },
    { name: "Food", value: 20, color: "#10b981", amount: 0.48 },
    { name: "Waste", value: 5, color: "#6366f1", amount: 0.12 },
  ]

  const recentAchievements = [
    { id: 1, title: "First Week Tracked", icon: "🎯", date: "2 days ago", points: 50 },
    { id: 2, title: "Green Commuter", icon: "🚲", date: "5 days ago", points: 100 },
    { id: 3, title: "Energy Saver", icon: "⚡", date: "1 week ago", points: 75 },
    { id: 4, title: "Waste Warrior", icon: "♻️", date: "1 week ago", points: 80 },
  ]

  const socialPosts = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Just reduced my carbon footprint by 15% this month! 🌱 #sustainability",
      likes: 24,
      comments: 8,
      time: "2h ago",
      image: "/placeholder.svg?height=200&width=300&text=Green+Achievement",
    },
    {
      id: 2,
      user: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Switched to cycling for my daily commute. Feeling great and saving the planet! 🚴‍♂️",
      likes: 18,
      comments: 5,
      time: "4h ago",
    },
    {
      id: 3,
      user: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Meal prep Sunday with locally sourced ingredients! 🥗 Small changes, big impact.",
      likes: 32,
      comments: 12,
      time: "6h ago",
    },
  ]

  const quickActions = [
    { icon: Car, label: "Log Transport", color: "bg-blue-500", description: "Track your daily commute" },
    { icon: Zap, label: "Energy Usage", color: "bg-yellow-500", description: "Monitor home energy" },
    { icon: Utensils, label: "Food Choices", color: "bg-green-500", description: "Log your meals" },
    { icon: Trash2, label: "Waste Tracking", color: "bg-purple-500", description: "Track waste generation" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">CarbonSense</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="text-green-600 font-medium border-b-2 border-green-600 pb-1">
                  Dashboard
                </Link>
                <Link href="/track" className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors">
                  Track
                </Link>
                <Link
                  href="/analytics"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
                >
                  Analytics
                </Link>
                <Link
                  href="/community"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
                >
                  Community
                </Link>
              </nav>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">3</Badge>
              </Button>
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">demo@gmail.com</span>
              </div>
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700"
            >
              <nav className="flex flex-col space-y-2 pt-4">
                <Link href="/dashboard" className="text-green-600 font-medium py-2">
                  Dashboard
                </Link>
                <Link href="/track" className="text-gray-600 dark:text-gray-300 py-2">
                  Track
                </Link>
                <Link href="/analytics" className="text-gray-600 dark:text-gray-300 py-2">
                  Analytics
                </Link>
                <Link href="/community" className="text-gray-600 dark:text-gray-300 py-2">
                  Community
                </Link>
                <Link href="/settings" className="text-gray-600 dark:text-gray-300 py-2">
                  Settings
                </Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, Demo User! 👋</h1>
              <p className="text-gray-600 dark:text-gray-300">Here's your sustainability progress overview for today</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Calendar className="h-4 w-4 mr-1" />
                Day {currentStreak} of your streak
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Current Footprint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalFootprint} tons CO₂</div>
                <p className="text-xs opacity-75 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  12% lower than last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Goal Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{goalProgress}%</div>
                <Progress value={goalProgress} className="mt-2" />
                <p className="text-xs text-gray-500 mt-1">Target: Reduce by 20%</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Current Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{currentStreak} days</div>
                <div className="flex items-center mt-2">
                  <div className="flex space-x-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          i < currentStreak ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Keep it up!</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">12</div>
                <div className="flex items-center mt-2">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-xs text-gray-500">3 new this week</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">305 total points</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emissions Trend */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2 text-green-600" />
                    Emissions Trend
                  </CardTitle>
                  <CardDescription>Your carbon footprint progress over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={emissionData}>
                      <defs>
                        <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="emissions"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorEmissions)"
                      />
                      <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Breakdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    This Week's Daily Emissions
                  </CardTitle>
                  <CardDescription>Daily breakdown of your carbon footprint</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="emissions" stroke="#3b82f6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                    Emissions by Category
                  </CardTitle>
                  <CardDescription>Breakdown of your current month's footprint</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-4">
                      {categoryData.map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                            <div>
                              <span className="text-sm font-medium">{category.name}</span>
                              <p className="text-xs text-gray-500">{category.amount} tons CO₂</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold">{category.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-indigo-600" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Track your daily activities with one click</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-24 flex-col space-y-2 bg-transparent hover:shadow-md transition-all group"
                      >
                        <div
                          className={`p-2 rounded-full ${action.color} text-white group-hover:scale-110 transition-transform`}
                        >
                          <action.icon className="h-5 w-5" />
                        </div>
                        <div className="text-center">
                          <span className="text-xs font-medium">{action.label}</span>
                          <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-600" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{achievement.date}</p>
                          <Badge variant="secondary" className="text-xs">
                            +{achievement.points} pts
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    View All Achievements
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Feed */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Community Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialPosts.map((post) => (
                    <div key={post.id} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <img
                          src={post.avatar || "/placeholder.svg"}
                          alt={post.user}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-sm">{post.user}</p>
                            <p className="text-xs text-gray-500">{post.time}</p>
                          </div>
                          <p className="text-sm mt-1 leading-relaxed">{post.content}</p>
                          {post.image && (
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Post content"
                              className="mt-2 rounded-lg w-full h-32 object-cover"
                            />
                          )}
                          <div className="flex items-center space-x-4 mt-3">
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                              <Heart className="h-4 w-4" />
                              <span className="text-xs">{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                              <MessageSquare className="h-4 w-4" />
                              <span className="text-xs">{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    View More Posts
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
