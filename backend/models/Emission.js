const mongoose = require("mongoose")

const emissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  transport: {
    mode: {
      type: String,
      required: true,
      enum: ["car", "bus", "train", "bike", "walk", "plane", "metro", "taxi", "motorcycle"],
    },
    distance: { type: Number, required: true, min: 0 },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid", "cng", "lpg"],
      default: "petrol",
    },
    emissions: { type: Number, required: true, min: 0 },
  },
  energy: {
    electricity: { type: Number, default: 0, min: 0 }, // kWh
    gas: { type: Number, default: 0, min: 0 }, // cubic meters
    heating: { type: Number, default: 0, min: 0 }, // kWh
    cooling: { type: Number, default: 0, min: 0 }, // kWh
    renewablePercentage: { type: Number, default: 0, min: 0, max: 100 },
    emissions: { type: Number, required: true, min: 0 },
  },
  diet: {
    type: {
      type: String,
      required: true,
      enum: ["meat", "vegetarian", "vegan", "pescatarian"],
    },
    meals: { type: Number, default: 3, min: 0, max: 10 },
    meatServings: { type: Number, default: 0, min: 0 },
    dairyServings: { type: Number, default: 0, min: 0 },
    localFood: { type: Boolean, default: false },
    organicFood: { type: Boolean, default: false },
    emissions: { type: Number, required: true, min: 0 },
  },
  lifestyle: {
    waste: { type: Number, default: 0, min: 0 }, // kg
    recycling: { type: Number, default: 0, min: 0 }, // kg
    water: { type: Number, default: 0, min: 0 }, // liters
    shopping: { type: Number, default: 0, min: 0 }, // amount spent
    digitalUsage: { type: Number, default: 0, min: 0 }, // hours
    emissions: { type: Number, default: 0, min: 0 },
  },
  totalEmissions: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    country: String,
    state: String,
    city: String,
  },
  weather: {
    temperature: Number,
    condition: String,
    humidity: Number,
  },
  notes: {
    type: String,
    maxlength: 500,
  },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Calculate total emissions before saving
emissionSchema.pre("save", function (next) {
  this.totalEmissions =
    this.transport.emissions + this.energy.emissions + this.diet.emissions + this.lifestyle.emissions

  this.updatedAt = new Date()
  next()
})

// Index for efficient queries
emissionSchema.index({ userId: 1, date: -1 })
emissionSchema.index({ date: -1 })
emissionSchema.index({ "location.country": 1, "location.state": 1 })

module.exports = mongoose.model("Emission", emissionSchema)
