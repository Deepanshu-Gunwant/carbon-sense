"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Leaf, ArrowLeft, Shield, Eye, Lock, Database, Users, Globe, FileText, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PrivacyPage() {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          description:
            "We collect information you provide directly to us, such as when you create an account, update your profile, or contact us for support. This includes your name, email address, location data (country, state, city), and any other information you choose to provide.",
        },
        {
          subtitle: "Usage Data",
          description:
            "We automatically collect information about how you use our service, including your carbon footprint data, activity logs, feature usage, and interaction patterns. This helps us improve our service and provide personalized recommendations.",
        },
        {
          subtitle: "Device Information",
          description:
            "We collect information about the device you use to access CarbonSense, including device type, operating system, browser type, IP address, and unique device identifiers.",
        },
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Provision",
          description:
            "We use your information to provide, maintain, and improve our carbon footprint tracking service, including calculating your emissions, generating reports, and providing personalized recommendations.",
        },
        {
          subtitle: "Communication",
          description:
            "We may use your information to send you service-related communications, updates about new features, sustainability tips, and responses to your inquiries.",
        },
        {
          subtitle: "Analytics and Improvement",
          description:
            "We analyze usage patterns and feedback to improve our service, develop new features, and enhance user experience. All analytics are performed on aggregated, anonymized data.",
        },
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: Users,
      content: [
        {
          subtitle: "No Sale of Personal Data",
          description:
            "We do not sell, rent, or trade your personal information to third parties for marketing purposes. Your data is yours, and we respect your privacy.",
        },
        {
          subtitle: "Service Providers",
          description:
            "We may share your information with trusted service providers who help us operate our service, such as cloud hosting providers, analytics services, and customer support tools. These providers are bound by strict confidentiality agreements.",
        },
        {
          subtitle: "Legal Requirements",
          description:
            "We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect the rights, property, or safety of CarbonSense, our users, or others.",
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Encryption",
          description:
            "All data transmitted between your device and our servers is encrypted using industry-standard TLS encryption. Your personal data is encrypted at rest using AES-256 encryption.",
        },
        {
          subtitle: "Access Controls",
          description:
            "We implement strict access controls to ensure that only authorized personnel can access your personal information, and only when necessary for service provision or support.",
        },
        {
          subtitle: "Regular Security Audits",
          description:
            "We conduct regular security audits and vulnerability assessments to identify and address potential security risks. Our security practices are reviewed and updated regularly.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Portability",
          description:
            "You have the right to access your personal information and request a copy of your data in a portable format. You can export your carbon footprint data at any time from your dashboard.",
        },
        {
          subtitle: "Correction and Deletion",
          description:
            "You can update or correct your personal information through your account settings. You also have the right to request deletion of your personal information, subject to certain legal obligations.",
        },
        {
          subtitle: "Communication Preferences",
          description:
            "You can control the types of communications you receive from us through your account settings or by following the unsubscribe instructions in our emails.",
        },
      ],
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      icon: Globe,
      content: [
        {
          subtitle: "Global Service",
          description:
            "CarbonSense is a global service, and your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.",
        },
        {
          subtitle: "Adequacy Decisions",
          description:
            "When transferring data internationally, we rely on adequacy decisions, standard contractual clauses, or other appropriate safeguards approved by relevant data protection authorities.",
        },
      ],
    },
  ]

  const principles = [
    {
      icon: Shield,
      title: "Privacy by Design",
      description:
        "We build privacy protection into our products and services from the ground up, not as an afterthought.",
    },
    {
      icon: Lock,
      title: "Data Minimization",
      description:
        "We collect only the data necessary to provide our service and delete data when it's no longer needed.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We're clear about what data we collect, how we use it, and who we share it with.",
    },
    {
      icon: Users,
      title: "User Control",
      description: "You have control over your data and can access, correct, or delete your information at any time.",
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
              Privacy <span className="text-green-600">Policy</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6"
            >
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal
              information when you use CarbonSense.
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

          {/* Privacy Principles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Privacy Principles</CardTitle>
                <CardDescription className="text-center text-lg">
                  The core principles that guide how we handle your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {principles.map((principle, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <principle.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{principle.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{principle.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <section.icon className="h-6 w-6 mr-3 text-green-600" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">{item.subtitle}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Data Retention */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <FileText className="h-6 w-6 mr-3 text-green-600" />
                  Data Retention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We retain your personal information for as long as necessary to provide our services and fulfill the
                    purposes outlined in this privacy policy. Specifically:
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Account Information:</strong> Retained for the duration of your account plus 30 days
                        after deletion
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Carbon Footprint Data:</strong> Retained for up to 7 years for historical analysis and
                        reporting
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Usage Analytics:</strong> Aggregated and anonymized data may be retained indefinitely
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Support Communications:</strong> Retained for 3 years for quality assurance and training
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Children's Privacy */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <AlertTriangle className="h-6 w-6 mr-3 text-orange-600" />
                  Children's Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  CarbonSense is not intended for children under the age of 13. We do not knowingly collect personal
                  information from children under 13. If you are a parent or guardian and believe your child has
                  provided us with personal information, please contact us immediately, and we will take steps to remove
                  such information from our systems.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Changes to Policy */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  We may update this privacy policy from time to time to reflect changes in our practices, technology,
                  legal requirements, or other factors. When we make changes, we will:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Update the "Last updated" date at the top of this policy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Notify you via email or through our service if the changes are material</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Provide you with the opportunity to review the changes before they take effect</span>
                  </li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your continued use of CarbonSense after any changes to this privacy policy constitutes your acceptance
                  of such changes.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl">
              <CardContent className="py-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
                <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                  If you have any questions about this privacy policy or how we handle your personal information, we're
                  here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                      Contact Privacy Team
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                  >
                    privacy@carbonsense.com
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
