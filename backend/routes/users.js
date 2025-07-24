const express = require("express")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const auth = require("../middleware/auth")
const locations = require("../data/locations")

const router = express.Router()

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  "/profile",
  [
    auth,
    body("name").optional().trim().isLength({ min: 2, max: 50 }),
    body("email").optional().isEmail().normalizeEmail(),
    body("location.country").optional().notEmpty(),
    body("location.state").optional().notEmpty(),
    body("location.city").optional().notEmpty(),
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

      const updates = req.body

      // Remove sensitive fields that shouldn't be updated via this route
      delete updates.password
      delete updates.badges
      delete updates.stats
      delete updates.social

      const user = await User.findByIdAndUpdate(
        req.userId,
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true },
      ).select("-password")

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      res.json({
        success: true,
        message: "Profile updated successfully",
        user,
      })
    } catch (error) {
      console.error("Update profile error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   GET /api/users/locations
// @desc    Get available locations
// @access  Public
router.get("/locations", (req, res) => {
  try {
    res.json({
      success: true,
      locations,
    })
  } catch (error) {
    console.error("Get locations error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   GET /api/users/achievements
// @desc    Get user achievements and badges
// @access  Private
router.get("/achievements", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("badges streak stats")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      badges: user.badges,
      streak: user.streak,
      stats: user.stats,
    })
  } catch (error) {
    console.error("Get achievements error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put(
  "/preferences",
  [
    auth,
    body("theme").optional().isIn(["light", "dark", "system"]),
    body("notifications").optional().isObject(),
    body("privacy").optional().isObject(),
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

      const { theme, notifications, privacy } = req.body
      const updateFields = {}

      if (theme) updateFields["preferences.theme"] = theme
      if (notifications) updateFields["preferences.notifications"] = notifications
      if (privacy) updateFields["preferences.privacy"] = privacy

      updateFields.updatedAt = new Date()

      const user = await User.findByIdAndUpdate(req.userId, updateFields, { new: true }).select("-password")

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      res.json({
        success: true,
        message: "Preferences updated successfully",
        preferences: user.preferences,
      })
    } catch (error) {
      console.error("Update preferences error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get("/stats", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("stats streak badges social")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const stats = {
      ...user.stats,
      streak: user.streak,
      badgeCount: user.badges.length,
      followersCount: user.social.followers.length,
      followingCount: user.social.following.length,
      postsCount: user.social.postsCount,
    }

    res.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("Get stats error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   POST /api/users/follow/:userId
// @desc    Follow/unfollow a user
// @access  Private
router.post("/follow/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params

    if (userId === req.userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      })
    }

    const user = await User.findById(req.userId)
    const targetUser = await User.findById(userId)

    if (!user || !targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const isFollowing = user.social.following.includes(userId)

    if (isFollowing) {
      // Unfollow
      user.social.following = user.social.following.filter((id) => id.toString() !== userId)
      targetUser.social.followers = targetUser.social.followers.filter((id) => id.toString() !== req.userId)
    } else {
      // Follow
      user.social.following.push(userId)
      targetUser.social.followers.push(req.userId)
    }

    await user.save()
    await targetUser.save()

    res.json({
      success: true,
      message: isFollowing ? "Unfollowed successfully" : "Followed successfully",
      isFollowing: !isFollowing,
    })
  } catch (error) {
    console.error("Follow/unfollow error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   GET /api/users/search
// @desc    Search users
// @access  Private
router.get("/search", auth, async (req, res) => {
  try {
    const { q, limit = 10 } = req.query

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      })
    }

    const users = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        { isActive: true },
        { "preferences.privacy.profileVisible": true },
        {
          $or: [{ name: { $regex: q, $options: "i" } }, { email: { $regex: q, $options: "i" } }],
        },
      ],
    })
      .select("name email avatar location stats social")
      .limit(Number.parseInt(limit))

    res.json({
      success: true,
      users,
    })
  } catch (error) {
    console.error("Search users error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router
