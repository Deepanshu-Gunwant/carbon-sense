const express = require("express")
const { body, validationResult } = require("express-validator")
const SocialPost = require("../models/SocialPost")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Create a new post
router.post(
  "/posts",
  [
    auth,
    body("content").trim().isLength({ min: 1, max: 1000 }).withMessage("Content must be between 1 and 1000 characters"),
    body("type").optional().isIn(["achievement", "tip", "progress", "general", "challenge", "milestone"]),
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

      const { content, type, achievement, emissions, challenge, images, tags } = req.body

      const user = await User.findById(req.userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      const post = new SocialPost({
        userId: req.userId,
        content,
        type: type || "general",
        achievement,
        emissions,
        challenge,
        images: images || [],
        tags: tags || [],
        location: user.location,
      })

      await post.save()

      // Update user's post count
      user.social.postsCount += 1
      await user.save()

      // Populate user data for response
      await post.populate("userId", "name avatar location")

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        post,
      })
    } catch (error) {
      console.error("Create post error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// Get social feed
router.get("/feed", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, type, country, state } = req.query

    const filter = { isActive: true }
    if (type && type !== "all") filter.type = type
    if (country) filter["location.country"] = country
    if (state) filter["location.state"] = state

    const skip = (page - 1) * limit
    const posts = await SocialPost.find(filter)
      .populate("userId", "name avatar location stats")
      .populate("comments.userId", "name avatar")
      .populate("likes.userId", "name avatar")
      .sort({ createdAt: -1 })
      .limit(Number.parseInt(limit))
      .skip(skip)

    const total = await SocialPost.countDocuments(filter)

    // Add interaction status for current user
    const postsWithInteractions = posts.map((post) => {
      const postObj = post.toObject()
      postObj.isLiked = post.likes.some((like) => like.userId.toString() === req.userId)
      postObj.likeCount = post.likes.length
      postObj.commentCount = post.comments.length
      postObj.shareCount = post.shares.length
      return postObj
    })

    res.json({
      success: true,
      posts: postsWithInteractions,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: skip + posts.length < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get feed error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Like/unlike a post
router.post("/:postId/like", auth, async (req, res) => {
  try {
    const post = await SocialPost.findById(req.params.postId)
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    const likeIndex = post.likes.findIndex((like) => like.userId.toString() === req.userId)

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1)
    } else {
      // Like
      post.likes.push({ userId: req.userId })

      // Update post owner's like count
      if (post.userId.toString() !== req.userId) {
        await User.findByIdAndUpdate(post.userId, {
          $inc: { "social.likesReceived": 1 },
        })
      }
    }

    await post.save()

    res.json({
      success: true,
      message: likeIndex > -1 ? "Post unliked" : "Post liked",
      isLiked: likeIndex === -1,
      likeCount: post.likes.length,
    })
  } catch (error) {
    console.error("Like post error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Add comment to post
router.post(
  "/:postId/comment",
  [
    auth,
    body("content").trim().isLength({ min: 1, max: 500 }).withMessage("Comment must be between 1 and 500 characters"),
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

      const { content } = req.body

      const post = await SocialPost.findById(req.params.postId)
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        })
      }

      const comment = {
        userId: req.userId,
        content,
        createdAt: new Date(),
      }

      post.comments.push(comment)
      await post.save()

      // Populate the new comment
      await post.populate("comments.userId", "name avatar")
      const newComment = post.comments[post.comments.length - 1]

      res.json({
        success: true,
        message: "Comment added successfully",
        comment: newComment,
      })
    } catch (error) {
      console.error("Add comment error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// Share a post
router.post(
  "/:postId/share",
  [auth, body("platform").isIn(["whatsapp", "instagram", "twitter", "facebook"]).withMessage("Invalid platform")],
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

      const { platform } = req.body

      const post = await SocialPost.findById(req.params.postId)
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        })
      }

      // Check if already shared on this platform
      const existingShare = post.shares.find(
        (share) => share.userId.toString() === req.userId && share.platform === platform,
      )

      if (!existingShare) {
        post.shares.push({
          userId: req.userId,
          platform,
          createdAt: new Date(),
        })
        await post.save()
      }

      res.json({
        success: true,
        message: "Post shared successfully",
        shareCount: post.shares.length,
      })
    } catch (error) {
      console.error("Share post error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// Get user's posts
router.get("/posts/my", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit

    const posts = await SocialPost.find({ userId: req.userId, isActive: true })
      .populate("userId", "name avatar location")
      .populate("comments.userId", "name avatar")
      .sort({ createdAt: -1 })
      .limit(Number.parseInt(limit))
      .skip(skip)

    const total = await SocialPost.countDocuments({ userId: req.userId, isActive: true })

    res.json({
      success: true,
      posts,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    })
  } catch (error) {
    console.error("Get user posts error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Delete a post
router.delete("/posts/:postId", auth, async (req, res) => {
  try {
    const post = await SocialPost.findOne({
      _id: req.params.postId,
      userId: req.userId,
    })

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    post.isActive = false
    await post.save()

    // Update user's post count
    await User.findByIdAndUpdate(req.userId, {
      $inc: { "social.postsCount": -1 },
    })

    res.json({
      success: true,
      message: "Post deleted successfully",
    })
  } catch (error) {
    console.error("Delete post error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Get trending posts
router.get("/trending", auth, async (req, res) => {
  try {
    const { limit = 10 } = req.query

    // Get posts from last 7 days with most engagement
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const posts = await SocialPost.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          isActive: true,
        },
      },
      {
        $addFields: {
          engagementScore: {
            $add: [
              { $size: "$likes" },
              { $multiply: [{ $size: "$comments" }, 2] },
              { $multiply: [{ $size: "$shares" }, 3] },
            ],
          },
        },
      },
      {
        $sort: { engagementScore: -1 },
      },
      {
        $limit: Number.parseInt(limit),
      },
    ])

    // Populate user data
    await SocialPost.populate(posts, [
      { path: "userId", select: "name avatar location" },
      { path: "comments.userId", select: "name avatar" },
    ])

    res.json({
      success: true,
      posts,
    })
  } catch (error) {
    console.error("Get trending posts error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router
