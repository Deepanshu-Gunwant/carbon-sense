"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("system")
  const [actualTheme, setActualTheme] = useState("light")

  // Initialize theme from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      setTheme(savedTheme || "system")
    }
  }, [])

  useEffect(() => {
    const updateTheme = () => {
      let newTheme = theme

      if (theme === "system") {
        if (typeof window !== "undefined") {
          newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        }
      }

      setActualTheme(newTheme)
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme === "dark")
      }
    }

    updateTheme()
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
    }

    if (theme === "system" && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQuery.addEventListener("change", updateTheme)
      return () => mediaQuery.removeEventListener("change", updateTheme)
    }
  }, [theme])

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
  }

  const value = {
    theme,
    actualTheme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
