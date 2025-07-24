const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  avatar: {
    type: String,
    default: "",
  },
  location: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  habits: {
    transport: {
      type: String,
      enum: ["car", "public", "bike", "walk", "mixed"],
      default: "mixed",
    },
    diet: {
      type: String,
      enum: ["meat", "vegetarian", "vegan", "pescatarian"],
      default: "meat",
    },
    energy: {
      type: String,
      enum: ["renewable", "mixed", "conventional"],
      default: "mixed",
    },
  },
  goals: [
    {
      title: String,
      target: Number,
      unit: String,
      deadline: Date,
      achieved: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  preferences: {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    notifications: {
      daily: { type: Boolean, default: true },
      weekly: { type: Boolean, default: true },
      achievements: { type: Boolean, default: true },
      social: { type: Boolean, default: false },
    },
    privacy: {
      profileVisible: { type: Boolean, default: true },
      dataSharing: { type: Boolean, default: false },
      analytics: { type: Boolean, default: true },
    },
  },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastTracked: { type: Date, default: null },
  },
  badges: [
    {
      id: String,
      title: String,
      description: String,
      icon: String,
      category: String,
      earnedAt: { type: Date, default: Date.now },
      progress: { type: Number, default: 100 },
    },
  ],
  stats: {
    totalEmissions: { type: Number, default: 0 },
    totalDaysTracked: { type: Number, default: 0 },
    averageDaily: { type: Number, default: 0 },
    bestDay: { type: Number, default: 0 },
    worstDay: { type: Number, default: 0 },
  },
  social: {
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    postsCount: { type: Number, default: 0 },
    likesReceived: { type: Number, default: 0 },
  },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Update timestamp on save
userSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Update streak method
userSchema.methods.updateStreak = function () {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastTracked = this.streak.lastTracked

  if (!lastTracked) {
    this.streak.current = 1
    this.streak.lastTracked = today
  } else {
    const lastTrackedDate = new Date(lastTracked)
    lastTrackedDate.setHours(0, 0, 0, 0)

    const daysDiff = Math.floor((today - lastTrackedDate) / (1000 * 60 * 60 * 24))

    if (daysDiff === 1) {
      this.streak.current += 1
      if (this.streak.current > this.streak.longest) {
        this.streak.longest = this.streak.current
      }
    } else if (daysDiff > 1) {
      this.streak.current = 1
    }

    this.streak.lastTracked = today
  }
}

// Get user profile without sensitive data
userSchema.methods.getPublicProfile = function () {
  const user = this.toObject()
  delete user.password
  delete user.preferences.notifications
  return user
}

module.exports = mongoose.model("User", userSchema)
