"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Leaf, ArrowLeft, Target, Users, Globe, Award, Heart, Lightbulb, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description:
        "We provide clear, accurate information about how we calculate your carbon footprint and where our data comes from.",
    },
    {
      icon: Users,
      title: "Accessibility",
      description:
        "Sustainability should be accessible to everyone, regardless of their technical knowledge or economic situation.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "We believe in the power of collective action and building a supportive community of environmentally conscious individuals.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously improve our platform with the latest technology and research to provide the best user experience.",
    },
  ]

  const features = [
    {
      icon: Globe,
      title: "Global Accuracy",
      description:
        "Our calculations are based on location-specific emission factors, considering your country, state, and city's unique energy sources and infrastructure.",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Connect with like-minded individuals, share your progress, and learn from others on their sustainability journey.",
      color: "text-purple-600",
    },
    {
      icon: Award,
      title: "Gamified Experience",
      description:
        "Stay motivated with achievements, streaks, and challenges that make reducing your carbon footprint engaging and rewarding.",
      color: "text-yellow-600",
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description:
        "Get personalized recommendations and insights powered by advanced AI to help you make the biggest impact on your carbon footprint.",
      color: "text-green-600",
    },
  ]

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
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              About <span className="text-green-600">CarbonSense</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Empowering individuals to track, understand, and reduce their carbon footprint for a sustainable future.
              We believe that small individual actions can create massive collective impact.
            </motion.p>
          </div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-3xl">
                  <Target className="h-8 w-8 mr-3 text-green-600" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  At CarbonSense, we believe that individual actions can create collective impact. Our mission is to
                  make carbon footprint tracking accessible, accurate, and actionable for everyone. We provide the
                  tools, insights, and community support needed to make sustainable living a reality.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Through cutting-edge technology, comprehensive data analysis, and a supportive global community, we're
                  building a platform that doesn't just track your environmental impact—it helps you reduce it in
                  meaningful, measurable ways.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
            >
              What Makes Us Different
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <feature.icon className={`h-6 w-6 mr-3 ${feature.color}`} />
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Our Core Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <value.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "150K+", label: "Active Users", description: "Tracking their footprint daily" },
                { number: "2.5M+", label: "Tons CO₂ Tracked", description: "Environmental impact measured" },
                { number: "95%", label: "User Satisfaction", description: "Love using our platform" },
                { number: "40+", label: "Countries", description: "Global community reach" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                  <p className="leading-relaxed mb-6">
                    CarbonSense was born from a simple realization: while climate change is a global challenge, the
                    solutions start with individual actions. Our founders, a team of environmental scientists, data
                    engineers, and sustainability advocates, came together with a shared vision of making environmental
                    impact tracking accessible to everyone.
                  </p>
                  <p className="leading-relaxed mb-6">
                    We noticed that existing carbon footprint calculators were either too simplistic or too complex,
                    often providing generic estimates that didn't reflect real-world variations. That's when we decided
                    to build something different—a platform that combines scientific accuracy with user-friendly design,
                    powered by location-specific data and AI-driven insights.
                  </p>
                  <p className="leading-relaxed">
                    Today, CarbonSense serves users across 40+ countries, helping them not just track their
                    environmental impact, but actively reduce it through personalized recommendations, community
                    challenges, and gamified experiences that make sustainability engaging and rewarding.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl">
              <CardContent className="py-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Sustainability Journey?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of users who are already making a positive impact on the environment with data-driven
                  insights and community support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                      Get Started Today
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
