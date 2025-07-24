const mongoose = require("mongoose")

const badgeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["streak", "emission", "social", "challenge", "milestone", "special"],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard", "legendary"],
    default: "easy",
  },
  criteria: {
    type: {
      type: String,
      enum: ["streak", "total_emissions", "daily_average", "reduction", "posts", "likes", "custom"],
      required: true,
    },
    value: Number,
    operator: {
      type: String,
      enum: ["gte", "lte", "eq"],
      default: "gte",
    },
    period: String, // 'daily', 'weekly', 'monthly', 'all_time'
  },
  rewards: {
    points: { type: Number, default: 0 },
    title: String,
    benefits: [String],
  },
  rarity: {
    type: String,
    enum: ["common", "rare", "epic", "legendary"],
    default: "common",
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Badge", badgeSchema)
