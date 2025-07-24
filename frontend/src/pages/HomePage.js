"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import {
  ChartBarIcon,
  GlobeAltIcon,
  TrophyIcon,
  UsersIcon,
  PlayIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"

const HomePage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [animatedText, setAnimatedText] = useState("")
  const [currentFeature, setCurrentFeature] = useState(0)

  const fullText = "Track Your Carbon Footprint with Precision"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setAnimatedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: ChartBarIcon,
      title: "Smart Tracking",
      description:
        "Monitor your daily carbon emissions across transport, energy, and lifestyle choices with intelligent automation.",
      color: "text-blue-600",
    },
    {
      icon: GlobeAltIcon,
      title: "Global Comparisons",
      description: "Compare your footprint with local, national, and global averages to understand your impact.",
      color: "text-green-600",
    },
    {
      icon: TrophyIcon,
      title: "Achievements",
      description: "Earn badges and rewards for reaching milestones and maintaining sustainable habits.",
      color: "text-yellow-600",
    },
    {
      icon: UsersIcon,
      title: "Community",
      description: "Connect with like-minded individuals, share progress, and learn from the community.",
      color: "text-purple-600",
    },
  ]

  const stats = [
    { number: "150K+", label: "Active Users" },
    { number: "2.5M+", label: "Tons CO₂ Tracked" },
    { number: "95%", label: "User Satisfaction" },
    { number: "40+", label: "Countries" },
  ]

  const demoSteps = [
    "Sign up with your location details",
    "Set your sustainability goals",
    "Track daily activities and emissions",
    "View insights and comparisons",
    "Earn badges and share progress",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-800 dark:text-green-200 text-sm font-medium"
                >
                  🌱 Track • Analyze • Reduce
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="block">{animatedText}</span>
                  <span className="text-green-600 dark:text-green-400">
                    {animatedText === fullText && "Make Every Day Count"}
                  </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                  Monitor your environmental impact, set meaningful goals, and join a community committed to fighting
                  climate change.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-colors"
                  >
                    <span>Start Tracking Free</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoPlaying(true)}
                  className="border-2 border-green-600 text-green-600 dark:text-green-400 px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <PlayIcon className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">Real-time</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tracking</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">AI-Powered</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Insights</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">Global</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Community</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Impact</h3>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                      -12% vs yesterday
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Transport</span>
                      <span className="font-medium text-gray-900 dark:text-white">2.4 kg CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1, delay: 1 }}
                        className="bg-green-600 h-2 rounded-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Energy</span>
                      <span className="font-medium text-gray-900 dark:text-white">1.8 kg CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "50%" }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="bg-blue-600 h-2 rounded-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Lifestyle</span>
                      <span className="font-medium text-gray-900 dark:text-white">0.9 kg CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "25%" }}
                        transition={{ duration: 1, delay: 1.4 }}
                        className="bg-yellow-600 h-2 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">Total Today</span>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">5.1 kg CO₂</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Everything You Need to Go <span className="text-green-600 dark:text-green-400">Carbon Neutral</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Comprehensive tools and insights to help you understand, track, and reduce your environmental impact.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${
                  currentFeature === index ? "ring-2 ring-green-500" : ""
                }`}
              >
                <div className={`w-12 h-12 ${feature.color} mb-4`}>
                  <feature.icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              See CarbonSense in Action
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Watch how easy it is to start tracking your carbon footprint and making a positive impact.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              {!isVideoPlaying ? (
                <div className="relative bg-gradient-to-br from-green-400 to-blue-500 h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative text-center text-white space-y-6">
                    <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🌱</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsVideoPlaying(true)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 mx-auto transition-colors"
                    >
                      <PlayIcon className="w-6 h-6" />
                      <span>Watch Demo</span>
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 to-blue-900 h-full p-8 flex flex-col justify-center">
                  <div className="text-center space-y-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">CarbonSense Demo Walkthrough</h3>
                    <div className="space-y-4 max-w-md mx-auto">
                      {demoSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.5 }}
                          className="flex items-center space-x-3 text-left"
                        >
                          <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{step}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 max-w-sm mx-auto">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Try it yourself:</p>
                      <p className="font-medium text-gray-900 dark:text-white">demo@gmail.com</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-600 dark:bg-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Make a Difference?</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Join thousands of users who are already tracking and reducing their carbon footprint with CarbonSense.
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <span>Start Your Journey Today</span>
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🌱</span>
                </div>
                <span className="text-xl font-bold text-green-400">CarbonSense</span>
              </div>
              <p className="text-gray-400">
                Empowering individuals to track, understand, and reduce their carbon footprint for a sustainable future.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <Link to="/features" className="block text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="block text-gray-400 hover:text-white transition-colors text-left"
                >
                  Demo
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Link to="/help" className="block text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link to="/careers" className="block text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CarbonSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
