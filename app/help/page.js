"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Leaf,
  ArrowLeft,
  Search,
  Book,
  MessageSquare,
  Video,
  FileText,
  HelpCircle,
  ChevronRight,
  Star,
  Clock,
  Users,
  Zap,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Topics", icon: Book, count: 24 },
    { id: "getting-started", name: "Getting Started", icon: Star, count: 6 },
    { id: "tracking", name: "Tracking Emissions", icon: BarChart3, count: 8 },
    { id: "dashboard", name: "Dashboard & Analytics", icon: Zap, count: 5 },
    { id: "community", name: "Community Features", icon: Users, count: 3 },
    { id: "account", name: "Account & Settings", icon: Settings, count: 4 },
    { id: "privacy", name: "Privacy & Security", icon: Shield, count: 2 },
  ]

  const popularArticles = [
    {
      id: 1,
      title: "How to Get Started with CarbonSense",
      description: "A complete guide to setting up your account and tracking your first emissions",
      category: "getting-started",
      readTime: "5 min read",
      views: "12.5k views",
      helpful: 95,
    },
    {
      id: 2,
      title: "Understanding Your Carbon Footprint Calculations",
      description: "Learn how we calculate your emissions and what factors influence your footprint",
      category: "tracking",
      readTime: "8 min read",
      views: "8.2k views",
      helpful: 92,
    },
    {
      id: 3,
      title: "Setting Up Location-Specific Tracking",
      description: "Configure your location settings for accurate emission calculations",
      category: "getting-started",
      readTime: "3 min read",
      views: "6.8k views",
      helpful: 89,
    },
    {
      id: 4,
      title: "Using the Dashboard Analytics",
      description: "Make sense of your data with our comprehensive dashboard features",
      category: "dashboard",
      readTime: "6 min read",
      views: "5.4k views",
      helpful: 87,
    },
    {
      id: 5,
      title: "Joining Community Challenges",
      description: "Participate in sustainability challenges and connect with others",
      category: "community",
      readTime: "4 min read",
      views: "4.1k views",
      helpful: 91,
    },
    {
      id: 6,
      title: "Managing Your Privacy Settings",
      description: "Control what data you share and how your information is used",
      category: "privacy",
      readTime: "7 min read",
      views: "3.9k views",
      helpful: 94,
    },
  ]

  const quickActions = [
    {
      icon: MessageSquare,
      title: "Contact Support",
      description: "Get help from our support team",
      action: "/contact",
      color: "bg-blue-500",
    },
    {
      icon: Video,
      title: "Watch Tutorials",
      description: "Video guides and walkthroughs",
      action: "#tutorials",
      color: "bg-purple-500",
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Technical documentation and API guides",
      action: "#docs",
      color: "bg-green-500",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Ask questions and share tips",
      action: "#community",
      color: "bg-orange-500",
    },
  ]

  const faqs = [
    {
      question: "How accurate are the carbon footprint calculations?",
      answer:
        "Our calculations use location-specific emission factors from official government databases and are updated regularly. We achieve 85-95% accuracy compared to professional carbon audits.",
      category: "tracking",
    },
    {
      question: "Can I track emissions for my entire family?",
      answer:
        "Yes, you can add family members to your account and track emissions for your household. Each member can have their own profile while contributing to family totals.",
      category: "account",
    },
    {
      question: "What data do you collect and how is it used?",
      answer:
        "We collect only the data necessary to calculate your carbon footprint. All personal data is encrypted and never sold to third parties. You can view and delete your data anytime.",
      category: "privacy",
    },
    {
      question: "How do I export my carbon footprint data?",
      answer:
        "You can export your data from the Settings page in various formats including CSV, PDF reports, and JSON. Historical data going back to your account creation is available.",
      category: "account",
    },
    {
      question: "Why are my emissions different from other calculators?",
      answer:
        "We use location-specific emission factors and more detailed calculation methods. Other calculators often use global averages, while we account for your specific region's energy mix and infrastructure.",
      category: "tracking",
    },
    {
      question: "How do I join community challenges?",
      answer:
        "Visit the Community section in your dashboard to see active challenges. You can join challenges that match your interests and track your progress against other participants.",
      category: "community",
    },
  ]

  const filteredArticles = popularArticles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
      </header>

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Help <span className="text-green-600">Center</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
            >
              Find answers to your questions and learn how to make the most of CarbonSense
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for help articles, guides, and FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg"
                />
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8"
            >
              Quick Actions
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={action.action}>
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 h-full cursor-pointer group">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <action.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{action.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="h-5 w-5 mr-2 text-green-600" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <category.icon className="h-4 w-4 mr-3" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Popular Articles */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {selectedCategory === "all"
                    ? "Popular Articles"
                    : `${categories.find((c) => c.id === selectedCategory)?.name} Articles`}
                </h2>
                <div className="space-y-4">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                {article.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {article.readTime}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {article.views}
                                </div>
                                <div className="flex items-center">
                                  <HelpCircle className="h-4 w-4 mr-1" />
                                  {article.helpful}% helpful
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors ml-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">{faq.question}</h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Still Need Help */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl">
                  <CardContent className="py-8 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-90" />
                    <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
                    <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                      Can't find what you're looking for? Our support team is here to help you with any questions or
                      issues.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/contact">
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                          Contact Support
                        </Button>
                      </Link>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                      >
                        Join Community Forum
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
