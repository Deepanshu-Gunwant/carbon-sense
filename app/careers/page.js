"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Leaf,
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Heart,
  Lightbulb,
  Target,
  Globe,
  Zap,
  Code,
  Palette,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "5+ years",
      description: "Join our engineering team to build scalable solutions for carbon footprint tracking and analysis.",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
      icon: Code,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote / New York",
      type: "Full-time",
      experience: "3+ years",
      description: "Design intuitive and engaging user experiences that make sustainability accessible to everyone.",
      skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Accessibility"],
      icon: Palette,
    },
    {
      id: 3,
      title: "Data Scientist",
      department: "Data & Analytics",
      location: "Remote / London",
      type: "Full-time",
      experience: "4+ years",
      description: "Develop AI models and algorithms to provide personalized carbon reduction recommendations.",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics"],
      icon: BarChart3,
    },
    {
      id: 4,
      title: "Environmental Scientist",
      department: "Research",
      location: "Remote / Berlin",
      type: "Full-time",
      experience: "3+ years",
      description: "Research and validate emission factors and methodologies to ensure calculation accuracy.",
      skills: ["Environmental Science", "Research", "Data Analysis", "Climate Science", "GIS"],
      icon: Globe,
    },
    {
      id: 5,
      title: "Community Manager",
      department: "Marketing",
      location: "Remote / Toronto",
      type: "Full-time",
      experience: "2+ years",
      description: "Build and nurture our global community of sustainability enthusiasts and advocates.",
      skills: ["Community Building", "Social Media", "Content Creation", "Analytics", "Communication"],
      icon: MessageSquare,
    },
    {
      id: 6,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote / Sydney",
      type: "Full-time",
      experience: "4+ years",
      description:
        "Maintain and scale our infrastructure to support millions of users tracking their carbon footprint.",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
      icon: Zap,
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness stipends",
    },
    {
      icon: Clock,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO policy",
    },
    {
      icon: Lightbulb,
      title: "Learning & Growth",
      description: "Professional development budget, conference attendance, and mentorship programs",
    },
    {
      icon: Users,
      title: "Inclusive Culture",
      description: "Diverse, inclusive workplace where everyone's voice is heard and valued",
    },
    {
      icon: Target,
      title: "Impact-Driven",
      description: "Work on meaningful projects that directly contribute to fighting climate change",
    },
    {
      icon: Globe,
      title: "Global Team",
      description: "Collaborate with talented individuals from around the world",
    },
  ]

  const values = [
    {
      title: "Environmental Impact",
      description: "Every decision we make considers its environmental impact and contribution to sustainability.",
    },
    {
      title: "Transparency",
      description: "We believe in open communication, honest feedback, and transparent business practices.",
    },
    {
      title: "Innovation",
      description: "We continuously push boundaries to create better solutions for environmental challenges.",
    },
    {
      title: "Collaboration",
      description: "We work together across teams and disciplines to achieve our shared mission.",
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
              Join Our <span className="text-green-600">Mission</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Help us build the future of sustainability technology. Join a passionate team working to make
              environmental impact tracking accessible, accurate, and actionable for millions of people worldwide.
            </motion.p>
          </div>

          {/* Company Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Our Values</CardTitle>
                <CardDescription className="text-center text-lg">
                  The principles that guide everything we do
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <h3 className="font-semibold text-xl mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits Section */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
            >
              Why Work With Us
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                        <benefit.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4"
            >
              Open Positions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              We're always looking for talented individuals who share our passion for sustainability and technology.
            </motion.p>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <position.icon className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                {position.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 mb-3">
                                <Badge variant="secondary" className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  {position.department}
                                </Badge>
                                <Badge variant="outline" className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {position.location}
                                </Badge>
                                <Badge variant="outline" className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {position.type}
                                </Badge>
                                <Badge variant="outline">{position.experience}</Badge>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                {position.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {position.skills.map((skill, skillIndex) => (
                                  <Badge key={skillIndex} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="lg:ml-8 mt-4 lg:mt-0">
                          <Button className="w-full lg:w-auto bg-green-600 hover:bg-green-700">Apply Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Our Hiring Process</CardTitle>
                <CardDescription className="text-center text-lg">What to expect when you apply</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    {
                      step: "1",
                      title: "Application Review",
                      description: "We review your application and portfolio within 3-5 business days.",
                    },
                    {
                      step: "2",
                      title: "Initial Interview",
                      description: "30-minute video call to discuss your background and interest in the role.",
                    },
                    {
                      step: "3",
                      title: "Technical Assessment",
                      description: "Role-specific assessment or portfolio review with our team.",
                    },
                    {
                      step: "4",
                      title: "Final Interview",
                      description: "Meet with team members and leadership to discuss culture fit and next steps.",
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                        {step.step}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl">
              <CardContent className="py-12">
                <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  We're always interested in hearing from talented individuals who are passionate about sustainability
                  and technology. Send us your resume and let us know how you'd like to contribute to our mission.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                      Get in Touch
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                  >
                    View All Openings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
