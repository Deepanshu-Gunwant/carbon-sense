const express = require("express")
const { body, validationResult } = require("express-validator")
const Emission = require("../models/Emission")
const User = require("../models/User")
const auth = require("../middleware/auth")
const { getEmissionFactors } = require("../data/emissionFactors")
const { checkAndAwardBadges } = require("../utils/badgeSystem")

const router = express.Router()

// Calculate emissions based on activity and location
const calculateEmissions = (activity, location) => {
  const factors = getEmissionFactors(location.country, location.state, location.city)
  if (!factors) return 0

  let emissions = 0

  // Transport emissions
  if (activity.transport) {
    const transportFactor = factors.transport[activity.transport.mode] || 0
    emissions += activity.transport.distance * transportFactor
  }

  // Energy emissions
  if (activity.energy) {
    const electricityFactor = factors.electricity * (1 - (activity.energy.renewablePercentage || 0) / 100)
    emissions += (activity.energy.electricity || 0) * electricityFactor
    emissions += (activity.energy.gas || 0) * 0.2 // Standard gas factor
    emissions += (activity.energy.heating || 0) * 0.3
    emissions += (activity.energy.cooling || 0) * 0.25
  }

  // Diet emissions
  if (activity.diet) {
    const dietFactor = factors.diet[activity.diet.type] || 0
    emissions += dietFactor * (activity.diet.meals || 1)

    // Additional factors for meat and dairy
    if (activity.diet.meatServings) {
      emissions += activity.diet.meatServings * 2.5
    }
    if (activity.diet.dairyServings) {
      emissions += activity.diet.dairyServings * 1.2
    }

    // Reduction for local/organic food
    if (activity.diet.localFood) emissions *= 0.9
    if (activity.diet.organicFood) emissions *= 0.95
  }

  return Math.round(emissions * 100) / 100 // Round to 2 decimal places
}

// @route   POST /api/emissions
// @desc    Add emission record
// @access  Private
router.post(
  "/",
  [
    auth,
    body("transport.mode").notEmpty().withMessage("Transport mode is required"),
    body("transport.distance").isNumeric().withMessage("Distance must be a number"),
    body("diet.type").notEmpty().withMessage("Diet type is required"),
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

      const { transport, energy, diet, lifestyle, date, notes } = req.body

      const user = await User.findById(req.userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      // Calculate emissions for each category
      const transportEmissions = transport ? calculateEmissions({ transport }, user.location) : 0
      const energyEmissions = energy ? calculateEmissions({ energy }, user.location) : 0
      const dietEmissions = diet ? calculateEmissions({ diet }, user.location) : 0
      const lifestyleEmissions = lifestyle
        ? lifestyle.waste * 0.5 + lifestyle.water * 0.001 + lifestyle.shopping * 0.1 + lifestyle.digitalUsage * 0.05
        : 0

      const emission = new Emission({
        userId: req.userId,
        date: date ? new Date(date) : new Date(),
        transport: {
          ...transport,
          emissions: transportEmissions,
        },
        energy: {
          ...energy,
          emissions: energyEmissions,
        },
        diet: {
          ...diet,
          emissions: dietEmissions,
        },
        lifestyle: {
          ...lifestyle,
          emissions: lifestyleEmissions,
        },
        location: user.location,
        notes,
      })

      await emission.save()

      // Update user's stats and streak
      user.stats.totalEmissions += emission.totalEmissions
      user.stats.totalDaysTracked += 1
      user.stats.averageDaily = user.stats.totalEmissions / user.stats.totalDaysTracked

      if (!user.stats.bestDay || emission.totalEmissions < user.stats.bestDay) {
        user.stats.bestDay = emission.totalEmissions
      }
      if (!user.stats.worstDay || emission.totalEmissions > user.stats.worstDay) {
        user.stats.worstDay = emission.totalEmissions
      }

      user.updateStreak()

      // Check for achievements
      await checkAndAwardBadges(user, emission)

      await user.save()

      res.status(201).json({
        success: true,
        message: "Emission record added successfully",
        emission,
        stats: {
          totalEmissions: user.stats.totalEmissions,
          streak: user.streak,
          newBadges: user.badges.filter((b) => new Date(b.earnedAt).getTime() > Date.now() - 5000),
        },
      })
    } catch (error) {
      console.error("Add emission error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   GET /api/emissions
// @desc    Get user's emissions
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const { startDate, endDate, limit = 30, page = 1 } = req.query

    const query = { userId: req.userId }

    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    const skip = (page - 1) * limit
    const emissions = await Emission.find(query).sort({ date: -1 }).limit(Number.parseInt(limit)).skip(skip)

    const total = await Emission.countDocuments(query)

    // Calculate statistics
    const totalEmissions = emissions.reduce((sum, e) => sum + e.totalEmissions, 0)
    const avgEmissions = emissions.length > 0 ? totalEmissions / emissions.length : 0

    res.json({
      success: true,
      emissions,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: skip + emissions.length < total,
        hasPrev: page > 1,
      },
      statistics: {
        total: Math.round(totalEmissions * 100) / 100,
        average: Math.round(avgEmissions * 100) / 100,
        count: emissions.length,
      },
    })
  } catch (error) {
    console.error("Get emissions error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   GET /api/emissions/analytics
// @desc    Get emissions analytics
// @access  Private
router.get("/analytics", auth, async (req, res) => {
  try {
    const { period = "30" } = req.query
    const daysBack = Number.parseInt(period)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const user = await User.findById(req.userId)

    // Get emissions for the specified period
    const emissions = await Emission.find({
      userId: req.userId,
      date: { $gte: startDate },
    }).sort({ date: 1 })

    // Calculate daily data
    const dailyData = emissions.map((e) => ({
      date: e.date.toISOString().split("T")[0],
      transport: e.transport.emissions,
      energy: e.energy.emissions,
      diet: e.diet.emissions,
      lifestyle: e.lifestyle.emissions,
      total: e.totalEmissions,
    }))

    // Calculate category breakdown
    const categoryTotals = emissions.reduce(
      (acc, e) => {
        acc.transport += e.transport.emissions
        acc.energy += e.energy.emissions
        acc.diet += e.diet.emissions
        acc.lifestyle += e.lifestyle.emissions
        return acc
      },
      { transport: 0, energy: 0, diet: 0, lifestyle: 0 },
    )

    const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0)
    const categoryBreakdown = Object.keys(categoryTotals).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: total > 0 ? Math.round((categoryTotals[key] / total) * 100) : 0,
      emissions: Math.round(categoryTotals[key] * 100) / 100,
    }))

    // Get regional averages (mock data for now - replace with real data)
    const regionalAverages = {
      city: 4.2,
      state: 4.8,
      country: 5.1,
      global: 4.9,
    }

    const userAverage = total / Math.max(emissions.length, 1)

    // Calculate trends
    const recentEmissions = emissions.slice(-7) // Last 7 days
    const previousEmissions = emissions.slice(-14, -7) // Previous 7 days

    const recentAvg =
      recentEmissions.reduce((sum, e) => sum + e.totalEmissions, 0) / Math.max(recentEmissions.length, 1)
    const previousAvg =
      previousEmissions.reduce((sum, e) => sum + e.totalEmissions, 0) / Math.max(previousEmissions.length, 1)

    const trend = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0

    res.json({
      success: true,
      analytics: {
        dailyData,
        categoryBreakdown,
        comparison: {
          user: Math.round(userAverage * 100) / 100,
          ...regionalAverages,
        },
        trends: {
          totalEmissions: Math.round(total * 100) / 100,
          daysTracked: emissions.length,
          averageDaily: Math.round(userAverage * 100) / 100,
          trend: Math.round(trend * 100) / 100,
          trendDirection: trend > 0 ? "up" : trend < 0 ? "down" : "stable",
        },
        goals: user.goals.map((goal) => ({
          ...goal,
          progress: Math.min((userAverage / goal.target) * 100, 100),
        })),
      },
    })
  } catch (error) {
    console.error("Analytics error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   PUT /api/emissions/:id
// @desc    Update emission record
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const emission = await Emission.findOne({
      _id: req.params.id,
      userId: req.userId,
    })

    if (!emission) {
      return res.status(404).json({
        success: false,
        message: "Emission record not found",
      })
    }

    // Update fields
    Object.assign(emission, req.body)
    emission.updatedAt = new Date()

    await emission.save()

    res.json({
      success: true,
      message: "Emission record updated successfully",
      emission,
    })
  } catch (error) {
    console.error("Update emission error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   DELETE /api/emissions/:id
// @desc    Delete emission record
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const emission = await Emission.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    })

    if (!emission) {
      return res.status(404).json({
        success: false,
        message: "Emission record not found",
      })
    }

    // Update user stats
    const user = await User.findById(req.userId)
    user.stats.totalEmissions -= emission.totalEmissions
    user.stats.totalDaysTracked = Math.max(0, user.stats.totalDaysTracked - 1)
    user.stats.averageDaily =
      user.stats.totalDaysTracked > 0 ? user.stats.totalEmissions / user.stats.totalDaysTracked : 0

    await user.save()

    res.json({
      success: true,
      message: "Emission record deleted successfully",
    })
  } catch (error) {
    console.error("Delete emission error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router
