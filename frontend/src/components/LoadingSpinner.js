"use client"
import { motion } from "framer-motion"

const LoadingSpinner = ({ size = "medium", color = "green", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const colorClasses = {
    green: "border-green-600",
    blue: "border-blue-600",
    gray: "border-gray-600",
    white: "border-white",
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          border-2 border-t-transparent rounded-full
        `}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

export default LoadingSpinner
