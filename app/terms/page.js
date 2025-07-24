"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Leaf, ArrowLeft, FileText, Scale, Shield, AlertTriangle, Users, Globe, Gavel, Ban } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function TermsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: Scale,
      content:
        "By accessing and using CarbonSense, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These terms apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.",
    },
    {
      id: "description",
      title: "Service Description",
      icon: Globe,
      content:
        "CarbonSense is a web-based platform that helps individuals track, analyze, and reduce their carbon footprint. Our service includes carbon footprint calculation tools, personalized recommendations, community features, achievement systems, and educational resources. We provide these services 'as is' and reserve the right to modify, suspend, or discontinue any aspect of the service at any time.",
    },
    {
      id: "user-accounts",
      title: "User Accounts and Registration",
      icon: Users,
      content:
        "To access certain features of CarbonSense, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      icon: Shield,
      content:
        "You agree to use CarbonSense only for lawful purposes and in accordance with these Terms. You agree not to use the service to transmit, distribute, store or destroy material that could constitute or encourage conduct that would be considered a criminal offense, give rise to civil liability, or otherwise violate any local, state, national or international law or regulation, or in a manner that will infringe the intellectual property or other rights of third parties.",
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: Ban,
      content:
        "You may not: (a) impersonate any person or entity or falsely state or otherwise misrepresent yourself; (b) use the service to transmit spam, chain letters, or other unsolicited communications; (c) attempt to gain unauthorized access to our systems or networks; (d) use automated scripts to collect information from or otherwise interact with the service; (e) interfere with or disrupt the service or servers or networks connected to the service.",
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: FileText,
      content:
        "The service and its original content, features, and functionality are and will remain the exclusive property of CarbonSense and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent. You retain ownership of any content you submit to the service, but grant us a license to use, modify, and display such content in connection with the service.",
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      icon: Shield,
      content:
        "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using CarbonSense, you agree to the collection and use of information in accordance with our Privacy Policy. We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      icon: AlertTriangle,
      content:
        "CarbonSense is provided 'as is' without any representations or warranties, express or implied. We make no representations or warranties in relation to this website or the information and materials provided on this website. While we strive to provide accurate carbon footprint calculations, these are estimates based on available data and methodologies. Actual emissions may vary. You acknowledge that such information and materials may contain inaccuracies or errors.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Gavel,
      content:
        "In no event shall CarbonSense, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service. Our total liability to you for all claims arising from or relating to the service shall not exceed the amount you paid us in the twelve months preceding the claim.",
    },
  ]

  const keyPoints = [
    {
      icon: Users,
      title: "User Responsibilities",
      description: "Provide accurate information, maintain account security, and use the service lawfully",
    },
    {
      icon: Shield,
      title: "Data Protection",
      description: "We protect your personal information and respect your privacy rights",
    },
    {
      icon: Globe,
      title: "Service Availability",
      description: "We strive for high availability but cannot guarantee uninterrupted service",
    },
    {
      icon: Scale,
      title: "Fair Usage",
      description: "Use our service responsibly and respect other users and our systems",
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Terms of <span className="text-green-600">Service</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6"
            >
              These terms and conditions outline the rules and regulations for the use of CarbonSense's website and
              services.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-4 text-sm text-gray-500"
            >
              <span>Last updated: January 15, 2025</span>
              <span>•</span>
              <span>Effective: January 15, 2025</span>
            </motion.div>
          </div>

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Key Points</CardTitle>
                <CardDescription className="text-center text-lg">
                  Important highlights from our terms of service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {keyPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <point.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{point.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{point.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <section.icon className="h-6 w-6 mr-3 text-green-600" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{section.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Termination */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Ban className="h-6 w-6 mr-3 text-red-600" />
                  Termination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We may terminate or suspend your account and bar access to the service immediately, without prior
                    notice or liability, under our sole discretion, for any reason whatsoever and without limitation,
                    including but not limited to a breach of the Terms.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    If you wish to terminate your account, you may simply discontinue using the service or contact us to
                    request account deletion. Upon termination, your right to use the service will cease immediately,
                    but these Terms will remain in effect regarding any use of the service prior to termination.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Governing Law */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Gavel className="h-6 w-6 mr-3 text-green-600" />
                  Governing Law and Jurisdiction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of the State of California, United States,
                  without regard to conflict of law provisions. Any disputes arising from these Terms or your use of the
                  service shall be resolved exclusively in the state and federal courts located in San Francisco County,
                  California, and you consent to the personal jurisdiction of such courts.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Changes to Terms */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-2xl">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                  revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                  What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  By continuing to access or use our service after any revisions become effective, you agree to be bound
                  by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the
                  service.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl">
              <CardContent className="py-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
                <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                  If you have any questions about these Terms of Service, please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                      Contact Legal Team
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                  >
                    legal@carbonsense.com
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
