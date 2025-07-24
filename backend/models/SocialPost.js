const mongoose = require("mongoose")

const socialPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000,
    trim: true,
  },
  type: {
    type: String,
    enum: ["achievement", "tip", "progress", "general", "challenge", "milestone"],
    default: "general",
  },
  images: [
    {
      url: String,
      caption: String,
      publicId: String, // for Cloudinary
    },
  ],
  achievement: {
    badgeId: String,
    title: String,
    icon: String,
    description: String,
  },
  emissions: {
    current: Number,
    previous: Number,
    reduction: Number,
    period: String, // 'daily', 'weekly', 'monthly'
  },
  challenge: {
    id: String,
    title: String,
    description: String,
    target: Number,
    progress: Number,
  },
  tags: [String],
  mentions: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
    },
  ],
  likes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        required: true,
        maxlength: 500,
      },
      likes: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      replies: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          content: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
  ],
  shares: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      platform: { type: String, enum: ["whatsapp", "instagram", "twitter", "facebook"] },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  location: {
    country: String,
    state: String,
    city: String,
  },
  visibility: {
    type: String,
    enum: ["public", "followers", "private"],
    default: "public",
  },
  isReported: { type: Boolean, default: false },
  reportCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Update timestamp on save
socialPostSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

// Virtual for like count
socialPostSchema.virtual("likeCount").get(function () {
  return this.likes.length
})

// Virtual for comment count
socialPostSchema.virtual("commentCount").get(function () {
  return this.comments.length
})

// Virtual for share count
socialPostSchema.virtual("shareCount").get(function () {
  return this.shares.length
})

// Index for efficient queries
socialPostSchema.index({ userId: 1, createdAt: -1 })
socialPostSchema.index({ createdAt: -1 })
socialPostSchema.index({ type: 1, createdAt: -1 })
socialPostSchema.index({ "location.country": 1, "location.state": 1 })
socialPostSchema.index({ tags: 1 })

module.exports = mongoose.model("SocialPost", socialPostSchema)
