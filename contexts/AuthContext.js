"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  // Initialize token from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token")
      setToken(storedToken)
    }
  }, [])

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [token])

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await axios.get("/api/auth/me")
          setUser(response.data)
        } catch (error) {
          console.error("Auth check failed:", error)
          if (typeof window !== "undefined") {
            localStorage.removeItem("token")
          }
          setToken(null)
        }
      }
      setLoading(false)
    }

    if (token !== null) {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password })
      const { token: newToken, user: userData } = response.data

      if (typeof window !== "undefined") {
        localStorage.setItem("token", newToken)
      }
      setToken(newToken)
      setUser(userData)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post("/api/auth/register", userData)
      const { token: newToken, user: newUser } = response.data

      if (typeof window !== "undefined") {
        localStorage.setItem("token", newToken)
      }
      setToken(newToken)
      setUser(newUser)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common["Authorization"]
  }

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }))
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
