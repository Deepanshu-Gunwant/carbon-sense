"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { motion } from "framer-motion"

export function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-0 relative">
          {/* Video Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-black/20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <Button
                  size="lg"
                  onClick={handlePlayPause}
                  className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-green-600 hover:text-green-700 shadow-2xl"
                >
                  <Play className="h-8 w-8 ml-1" />
                </Button>
              </motion.div>
            )}

            {/* Demo Content Simulation */}
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gray-900/80 flex items-center justify-center"
              >
                <div className="text-center text-white p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">🌱 Welcome to CarbonSense</h3>
                    <p className="text-lg mb-6">See how easy it is to track your carbon footprint</p>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-green-500 p-4 rounded-lg"
                      >
                        <div className="text-2xl font-bold">2.4</div>
                        <div className="text-sm">tons CO₂</div>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="bg-blue-500 p-4 rounded-lg"
                      >
                        <div className="text-2xl font-bold">65%</div>
                        <div className="text-sm">Goal Progress</div>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.4 }}
                        className="bg-purple-500 p-4 rounded-lg"
                      >
                        <div className="text-2xl font-bold">7</div>
                        <div className="text-sm">Day Streak</div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={handlePlayPause} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleMute} className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex-1 mx-4">
                <div className="bg-white/30 rounded-full h-1">
                  <motion.div
                    className="bg-green-500 h-1 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: isPlaying ? "100%" : "0%" }}
                    transition={{ duration: 30, ease: "linear" }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">2:30</span>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              CarbonSense Platform Walkthrough
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover how CarbonSense makes it simple to track your carbon footprint, set sustainability goals, and
              connect with a community of environmentally conscious individuals.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Dashboard Overview", "Goal Setting", "Community Features", "Achievement System"].map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Ready to start your sustainability journey? Sign up now and get access to all features.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-green-600 hover:bg-green-700">Start Free Trial</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </motion.div>
  )
}
