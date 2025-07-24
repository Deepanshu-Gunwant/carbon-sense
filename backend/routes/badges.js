const express = require("express")
const Badge = require("../models/Badge")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/badges
// @desc    Get all available badges
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const badges = await Badge.find({ isActive: true }).sort({ category: 1, difficulty: 1 })

    const user = await User.findById(req.userId).select("badges")
    const earnedBadgeIds = user.badges.map((b) => b.id)

    const badgesWithStatus = badges.map((badge) => ({
      ...badge.toObject(),
      earned: earnedBadgeIds.includes(badge.id),
      earnedAt: user.badges.find((b) => b.id === badge.id)?.earnedAt || null,
    }))

    res.json({
      success: true,
      badges: badgesWithStatus,
    })
  } catch (error) {
    console.error("Get badges error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   GET /api/badges/categories
// @desc    Get badges grouped by category
// @access  Private
router.get("/categories", auth, async (req, res) => {
  try {
    const badges = await Badge.find({ isActive: true })
    const user = await User.findById(req.userId).select("badges")
    const earnedBadgeIds = user.badges.map((b) => b.id)

    const categorizedBadges = badges.reduce((acc, badge) => {
      if (!acc[badge.category]) {
        acc[badge.category] = []
      }

      acc[badge.category].push({
        ...badge.toObject(),
        earned: earnedBadgeIds.includes(badge.id),
        earnedAt: user.badges.find((b) => b.id === badge.id)?.earnedAt || null,
      })

      return acc
    }, {})

    res.json({
      success: true,
      categories: categorizedBadges,
    })
  } catch (error) {
    console.error("Get badge categories error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   GET /api/badges/leaderboard
// @desc    Get badge leaderboard
// @access  Private
router.get("/leaderboard", auth, async (req, res) => {
  try {
    const { limit = 10 } = req.query

    const leaderboard = await User.aggregate([
      {
        $match: {
          isActive: true,
          "preferences.privacy.profileVisible": true,
        },
      },
      {
        $project: {
          name: 1,
          avatar: 1,
          location: 1,
          badgeCount: { $size: "$badges" },
          totalPoints: { $sum: "$badges.progress" },
          recentBadges: {
            $slice: [
              {
                $sortArray: {
                  input: "$badges",
                  sortBy: { earnedAt: -1 },
                },
              },
              3,
            ],
          },
        },
      },
      {
        $sort: { badgeCount: -1, totalPoints: -1 },
      },
      {
        $limit: Number.parseInt(limit),
      },
    ])

    res.json({
      success: true,
      leaderboard,
    })
  } catch (error) {
    console.error("Get badge leaderboard error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router
