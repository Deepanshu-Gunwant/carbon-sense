"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Leaf, TrendingDown, Users, Award, Play, ArrowRight, BarChart3, Target, Globe, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { DemoVideo } from "@/components/demo-video"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollingText, setScrollingText] = useState("")

  const fullText = "Track Your Carbon Footprint with Precision and Make Every Day Count for Our Planet"

  useEffect(() => {
    setIsVisible(true)

    // Scrolling text effect
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setScrollingText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const stats = [
    { number: "150K+", label: "Active Users" },
    { number: "2.5M+", label: "Tons CO₂ Tracked" },
    { number: "95%", label: "User Satisfaction" },
    { number: "40+", label: "Countries Supported" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">CarbonSense</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
              >
                Features
              </Link>
              <Link href="#demo" className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors">
                Demo
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
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
              className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700"
            >
              <nav className="flex flex-col space-y-2 pt-4">
                <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-green-600 py-2">
                  Features
                </Link>
                <Link href="#demo" className="text-gray-600 dark:text-gray-300 hover:text-green-600 py-2">
                  Demo
                </Link>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-green-600 py-2">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-green-600 py-2">
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-2">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Sign Up</Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800">
              🌱 Start Your Sustainability Journey Today
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="block min-h-[1.2em]">{scrollingText}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Monitor, analyze, and reduce your environmental impact with AI-powered insights, accurate city-specific
              calculations, and a supportive global community committed to fighting climate change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 group">
                  Start Your Tracking Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20"
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for <span className="text-green-600">Sustainable Living</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to understand, track, and reduce your environmental impact with precision and
              community support.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: BarChart3,
                title: "Smart Dashboard",
                description:
                  "Real-time tracking of your carbon footprint with detailed analytics, progress visualization, and personalized insights.",
                color: "text-blue-600",
              },
              {
                icon: Globe,
                title: "Global Accuracy",
                description:
                  "Precise calculations based on your specific country, state, and city emission factors with real-time data updates.",
                color: "text-green-600",
              },
              {
                icon: Target,
                title: "Goal Setting & Tracking",
                description:
                  "Set personalized reduction targets, track your progress, and celebrate milestones with our achievement system.",
                color: "text-purple-600",
              },
              {
                icon: TrendingDown,
                title: "AI-Powered Insights",
                description:
                  "Get personalized recommendations to reduce your footprint using advanced AI analysis and machine learning.",
                color: "text-red-600",
              },
              {
                icon: Users,
                title: "Community & Social",
                description:
                  "Connect with like-minded individuals, share progress, participate in challenges, and learn from others.",
                color: "text-indigo-600",
              },
              {
                icon: Award,
                title: "Gamification & Rewards",
                description:
                  "Earn badges, maintain streaks, participate in challenges, and unlock achievements to stay motivated.",
                color: "text-yellow-600",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group">
                  <CardHeader>
                    <feature.icon
                      className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
                    />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">See CarbonSense in Action</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Watch how easy it is to start tracking your carbon footprint and making a positive environmental impact
              with our comprehensive platform.
            </p>
          </motion.div>
          <DemoVideo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 dark:bg-green-700">
        <div className="container mx-auto text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Make a Real Difference?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already reducing their carbon footprint and creating a sustainable future
              for generations to come.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 group">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold">CarbonSense</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering individuals to track, understand, and reduce their carbon footprint for a sustainable future.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#demo" className="hover:text-white transition-colors">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Centre
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CarbonSense. All rights reserved. Made with 💚 for the planet.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
