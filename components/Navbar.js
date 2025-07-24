"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import { motion } from "framer-motion"
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const themeOptions = [
    { value: "light", icon: SunIcon, label: "Light" },
    { value: "dark", icon: MoonIcon, label: "Dark" },
    { value: "system", icon: ComputerDesktopIcon, label: "System" },
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌱</span>
              </div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">CarbonSense</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/features"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/track"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Track
                </Link>
                <Link
                  href="/analytics"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Analytics
                </Link>
                <Link
                  href="/social"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Social
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === "light" && <SunIcon className="w-5 h-5" />}
                {theme === "dark" && <MoonIcon className="w-5 h-5" />}
                {theme === "system" && <ComputerDesktopIcon className="w-5 h-5" />}
              </button>

              {isThemeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        toggleTheme(option.value)
                        setIsThemeMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        theme === option.value
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <option.icon className="w-4 h-4" />
                      <span className="text-sm">{option.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <UserCircleIcon className="w-5 h-5" />
                  <span>{user?.email}</span>
                </div>
                <Link
                  href="/settings"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
            >
              {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
          >
            <div className="flex flex-col space-y-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/features"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Features
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/track"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Track
                  </Link>
                  <Link
                    href="/analytics"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Analytics
                  </Link>
                  <Link
                    href="/social"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Social
                  </Link>
                  <Link
                    href="/settings"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
