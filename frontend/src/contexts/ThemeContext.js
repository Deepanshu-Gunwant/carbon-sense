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
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme || "system"
  })

  const [actualTheme, setActualTheme] = useState("light")

  useEffect(() => {
    const updateTheme = () => {
      let newTheme = theme

      if (theme === "system") {
        newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }

      setActualTheme(newTheme)
      document.documentElement.classList.toggle("dark", newTheme === "dark")
    }

    updateTheme()
    localStorage.setItem("theme", theme)

    if (theme === "system") {
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
