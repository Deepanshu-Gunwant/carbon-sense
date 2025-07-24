const express = require("express")
const OpenAI = require("openai")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const Emission = require("../models/Emission")
const auth = require("../middleware/auth")

const router = express.Router()

// Initialize OpenAI (you'll need to set OPENAI_API_KEY in environment)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "your-openai-api-key-here",
})

// @route   POST /api/ai/recommendations
// @desc    Get AI recommendations
// @access  Private
router.post("/recommendations", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Get user's recent emissions data
    const recentEmissions = await Emission.find({ userId: req.userId }).sort({ date: -1 }).limit(7)

    if (recentEmissions.length === 0) {
      return res.json({
        success: true,
        recommendations: [
          {
            category: "Getting Started",
            title: "Start Tracking Your Emissions",
            description: "Begin by logging your daily activities to get personalized recommendations.",
            impact: "High",
            difficulty: "Easy",
          },
        ],
      })
    }

    // Calculate averages
    const avgTransport = recentEmissions.reduce((sum, e) => sum + e.transport.emissions, 0) / recentEmissions.length
    const avgEnergy = recentEmissions.reduce((sum, e) => sum + e.energy.emissions, 0) / recentEmissions.length
    const avgDiet = recentEmissions.reduce((sum, e) => sum + e.diet.emissions, 0) / recentEmissions.length
    const avgLifestyle = recentEmissions.reduce((sum, e) => sum + e.lifestyle.emissions, 0) / recentEmissions.length

    // Create context for AI
    const context = `
      User Profile:
      - Location: ${user.location.city}, ${user.location.state}, ${user.location.country}
      - Goals: ${user.goals.map((g) => g.title).join(", ") || "No specific goals set"}
      - Transport habit: ${user.habits.transport || "Not specified"}
      - Diet: ${user.habits.diet || "Not specified"}
      - Energy: ${user.habits.energy || "Not specified"}
      
      Recent Emissions (daily averages over ${recentEmissions.length} days):
      - Transport: ${avgTransport.toFixed(2)} kg CO2
      - Energy: ${avgEnergy.toFixed(2)} kg CO2
      - Diet: ${avgDiet.toFixed(2)} kg CO2
      - Lifestyle: ${avgLifestyle.toFixed(2)} kg CO2
      - Total: ${(avgTransport + avgEnergy + avgDiet + avgLifestyle).toFixed(2)} kg CO2
      
      Please provide 3-5 personalized recommendations to reduce carbon footprint, considering their location and current habits.
      Format as JSON with category, title, description, impact (High/Medium/Low), and difficulty (Easy/Medium/Hard).
    `

    let recommendations = []

    // Try to get AI recommendations
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your-openai-api-key-here") {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are an environmental sustainability expert. Provide practical, location-specific advice for reducing carbon footprint. Respond with valid JSON only.",
            },
            {
              role: "user",
              content: context,
            },
          ],
          max_tokens: 800,
          temperature: 0.7,
        })

        const aiResponse = completion.choices[0].message.content
        recommendations = JSON.parse(aiResponse)
      } catch (aiError) {
        console.error("OpenAI API error:", aiError)
        // Fall back to mock recommendations
      }
    }

    // Fallback to smart mock recommendations if AI fails
    if (!recommendations || recommendations.length === 0) {
      recommendations = generateSmartRecommendations(user, avgTransport, avgEnergy, avgDiet, avgLifestyle)
    }

    res.json({
      success: true,
      recommendations,
      context: {
        totalEmissions: (avgTransport + avgEnergy + avgDiet + avgLifestyle).toFixed(2),
        daysAnalyzed: recentEmissions.length,
        topCategory: getTopEmissionCategory(avgTransport, avgEnergy, avgDiet, avgLifestyle),
      },
    })
  } catch (error) {
    console.error("AI recommendations error:", error)
    res.status(500).json({
      success: false,
      message: "Server error generating recommendations",
    })
  }
})

// @route   POST /api/ai/chat
// @desc    AI Chat Assistant
// @access  Private
router.post(
  "/chat",
  [
    auth,
    body("message").trim().isLength({ min: 1, max: 500 }).withMessage("Message must be between 1 and 500 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const { message, conversationHistory = [] } = req.body

      const user = await User.findById(req.userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      // Get user context
      const recentEmissions = await Emission.find({ userId: req.userId }).sort({ date: -1 }).limit(3)

      const userContext = `
      User: ${user.name}
      Location: ${user.location.city}, ${user.location.country}
      Recent average emissions: ${
        recentEmissions.length > 0
          ? (recentEmissions.reduce((sum, e) => sum + e.totalEmissions, 0) / recentEmissions.length).toFixed(2)
          : "No data"
      } kg CO2/day
      Goals: ${user.goals.map((g) => g.title).join(", ") || "None set"}
    `

      let response = ""

      // Try to get AI response
      if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your-openai-api-key-here") {
        try {
          const messages = [
            {
              role: "system",
              content: `You are EcoBot, a friendly AI assistant specializing in carbon footprint reduction and sustainability. 
                     Help users with practical advice, answer questions about emissions, and provide encouragement.
                     Keep responses concise and actionable. User context: ${userContext}`,
            },
            ...conversationHistory.slice(-6), // Keep last 6 messages for context
            {
              role: "user",
              content: message,
            },
          ]

          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            max_tokens: 300,
            temperature: 0.8,
          })

          response = completion.choices[0].message.content
        } catch (aiError) {
          console.error("OpenAI Chat API error:", aiError)
          // Fall back to rule-based responses
        }
      }

      // Fallback to rule-based responses
      if (!response) {
        response = generateRuleBasedResponse(message, user, recentEmissions)
      }

      res.json({
        success: true,
        response,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("AI chat error:", error)
      res.status(500).json({
        success: false,
        message: "Server error in chat",
      })
    }
  },
)

// @route   GET /api/ai/tips/:category
// @desc    Get AI tips based on specific category
// @access  Private
router.get("/tips/:category", auth, async (req, res) => {
  try {
    const { category } = req.params
    const user = await User.findById(req.userId)

    const categoryTips = {
      transport: [
        "Walk or bike for trips under 2km to reduce emissions by up to 100%",
        "Combine multiple errands into one trip to maximize efficiency",
        "Use public transport during peak hours when it's most efficient",
        "Consider carpooling with colleagues to split emissions",
        "Work from home when possible to eliminate commute emissions",
        "Maintain your vehicle properly - well-tuned engines are 10% more efficient",
        "Plan routes to avoid traffic congestion and reduce fuel consumption",
      ],
      energy: [
        "Switch to LED bulbs - they use 75% less energy than incandescent",
        "Unplug electronics when not in use to eliminate phantom loads",
        "Use a programmable thermostat to optimize heating and cooling",
        "Air dry clothes instead of using a dryer when weather permits",
        "Seal air leaks around windows and doors to improve efficiency",
        "Use cold water for washing clothes - saves up to 90% of energy",
        "Consider renewable energy options like solar panels",
      ],
      diet: [
        "Plan meals to reduce food waste - 30% of food is wasted globally",
        "Buy local and seasonal produce to reduce transport emissions",
        "Reduce meat consumption gradually - even one day per week helps",
        "Grow herbs and vegetables at home for zero-mile food",
        "Choose sustainable seafood options to protect marine ecosystems",
        "Compost food scraps to reduce methane emissions from landfills",
        "Support regenerative agriculture practices when possible",
      ],
      lifestyle: [
        "Buy only what you need to reduce consumption emissions",
        "Choose quality items that last longer over cheap alternatives",
        "Repair and reuse items instead of replacing them",
        "Use digital receipts and bills to reduce paper waste",
        "Choose eco-friendly cleaning products and personal care items",
        "Reduce single-use plastics in daily life",
        "Support businesses with strong environmental commitments",
      ],
    }

    const tips = categoryTips[category] || []

    // Personalize tips based on user location and habits
    const personalizedTips = tips.map((tip) => {
      if (category === "transport" && user.location.country === "India") {
        return tip.replace("2km", "1.5km").replace("colleagues", "friends or colleagues")
      }
      return tip
    })

    res.json({
      success: true,
      category,
      tips: personalizedTips.slice(0, 5), // Return top 5 tips
      location: user.location,
    })
  } catch (error) {
    console.error("AI tips error:", error)
    res.status(500).json({
      success: false,
      message: "Server error generating tips",
    })
  }
})

// Helper function to generate smart recommendations
function generateSmartRecommendations(user, avgTransport, avgEnergy, avgDiet, avgLifestyle) {
  const recommendations = []
  const total = avgTransport + avgEnergy + avgDiet + avgLifestyle

  // Transport recommendations
  if (avgTransport > total * 0.4) {
    recommendations.push({
      category: "Transport",
      title: "Optimize Your Commute",
      description: `Your transport emissions are ${((avgTransport / total) * 100).toFixed(0)}% of your total. Consider using public transport or biking 2-3 days per week.`,
      impact: "High",
      difficulty: "Medium",
    })
  }

  // Energy recommendations
  if (avgEnergy > total * 0.3) {
    recommendations.push({
      category: "Energy",
      title: "Reduce Home Energy Use",
      description:
        "Your energy consumption is above average. Try adjusting your thermostat by 2°C and switching to LED bulbs.",
      impact: "Medium",
      difficulty: "Easy",
    })
  }

  // Diet recommendations
  if (user.habits.diet === "meat" && avgDiet > total * 0.25) {
    recommendations.push({
      category: "Diet",
      title: "Try Meatless Mondays",
      description: "Reducing meat consumption by just one day per week can cut your diet emissions by 14%.",
      impact: "High",
      difficulty: "Easy",
    })
  }

  // Location-specific recommendations
  if (user.location.country === "India") {
    recommendations.push({
      category: "Local Action",
      title: "Use Local Transport Options",
      description: `In ${user.location.city}, consider using local buses or metro systems which are more efficient than private vehicles.`,
      impact: "Medium",
      difficulty: "Easy",
    })
  }

  // General recommendation if emissions are low
  if (total < 3) {
    recommendations.push({
      category: "Community",
      title: "Share Your Success",
      description:
        "Your emissions are below average! Share your tips with the community to help others reduce their footprint.",
      impact: "Medium",
      difficulty: "Easy",
    })
  }

  return recommendations.slice(0, 4) // Return top 4 recommendations
}

// Helper function to get top emission category
function getTopEmissionCategory(transport, energy, diet, lifestyle) {
  const categories = { transport, energy, diet, lifestyle }
  return Object.keys(categories).reduce((a, b) => (categories[a] > categories[b] ? a : b))
}

// Helper function for rule-based chat responses
function generateRuleBasedResponse(message, user, recentEmissions) {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return `Hello ${user.name}! I'm EcoBot, your sustainability assistant. How can I help you reduce your carbon footprint today?`
  }

  if (lowerMessage.includes("emission") || lowerMessage.includes("carbon")) {
    if (recentEmissions.length > 0) {
      const avg = recentEmissions.reduce((sum, e) => sum + e.totalEmissions, 0) / recentEmissions.length
      return `Based on your recent data, you're averaging ${avg.toFixed(2)} kg CO2 per day. The global average is about 4.9 kg, so you're doing ${avg < 4.9 ? "great" : "well, but there's room for improvement"}!`
    }
    return "I'd love to help you understand your emissions! Start by logging some activities and I can provide personalized insights."
  }

  if (lowerMessage.includes("transport") || lowerMessage.includes("travel")) {
    return "For transport, try combining trips, using public transport, or biking for short distances. Even small changes can make a big difference!"
  }

  if (lowerMessage.includes("energy") || lowerMessage.includes("electricity")) {
    return "To reduce energy emissions, try adjusting your thermostat, using LED bulbs, and unplugging devices when not in use. These simple steps can cut your energy footprint significantly!"
  }

  if (lowerMessage.includes("food") || lowerMessage.includes("diet")) {
    return "Diet has a huge impact! Try eating more plant-based meals, buying local produce, and reducing food waste. Even one meatless day per week helps!"
  }

  if (lowerMessage.includes("tip") || lowerMessage.includes("advice")) {
    return "Here's a quick tip: The easiest way to start reducing emissions is to be mindful of your daily choices. Small consistent actions lead to big changes over time!"
  }

  // Default response
  return "I'm here to help you with sustainability questions! Ask me about reducing emissions, energy saving tips, or sustainable lifestyle choices."
}

module.exports = router
