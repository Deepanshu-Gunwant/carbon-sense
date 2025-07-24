import axios from "axios"
import toast from "react-hot-toast"

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Unauthorized - clear auth data and redirect to login
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
            window.location.href = "/login"
          }
          break

        case 403:
          toast.error("Access forbidden")
          break

        case 404:
          toast.error("Resource not found")
          break

        case 429:
          toast.error("Too many requests. Please try again later.")
          break

        case 500:
          toast.error("Server error. Please try again later.")
          break

        default:
          if (data?.message) {
            toast.error(data.message)
          } else {
            toast.error("An unexpected error occurred")
          }
      }
    } else if (error.request) {
      // Network error
      toast.error("Network error. Please check your connection.")
    } else {
      // Something else happened
      toast.error("An unexpected error occurred")
    }

    return Promise.reject(error)
  },
)

export default api
