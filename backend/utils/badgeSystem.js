const Badge = require("../models/Badge")

// Check and award badges to user based on their activity
const checkAndAwardBadges = async (user, emission = null) => {
  try {
    // Get all available badges
    const availableBadges = await Badge.find({ isActive: true })
    const earnedBadgeIds = user.badges.map((b) => b.id)

    const newBadges = []

    for (const badge of availableBadges) {
      // Skip if already earned
      if (earnedBadgeIds.includes(badge.id)) continue

      let shouldAward = false

      switch (badge.criteria.type) {
        case "streak":
          shouldAward = checkStreakCriteria(user, badge.criteria)
          break
        case "total_emissions":
          shouldAward = checkTotalEmissionsCriteria(user, badge.criteria)
          break
        case "daily_average":
          shouldAward = checkDailyAverageCriteria(user, badge.criteria)
          break
        case "reduction":
          shouldAward = checkReductionCriteria(user, badge.criteria)
          break
        case "posts":
          shouldAward = checkPostsCriteria(user, badge.criteria)
          break
        case "likes":
          shouldAward = checkLikesCriteria(user, badge.criteria)
          break
        case "custom":
          shouldAward = checkCustomCriteria(user, badge, emission)
          break
      }

      if (shouldAward) {
        const newBadge = {
          id: badge.id,
          title: badge.title,
          description: badge.description,
          icon: badge.icon,
          category: badge.category,
          earnedAt: new Date(),
          progress: 100,
        }

        user.badges.push(newBadge)
        newBadges.push(newBadge)
      }
    }

    return newBadges
  } catch (error) {
    console.error("Badge system error:", error)
    return []
  }
}

// Check streak-based criteria
const checkStreakCriteria = (user, criteria) => {
  const streakValue = criteria.period === "longest" ? user.streak.longest : user.streak.current
  return evaluateCriteria(streakValue, criteria.value, criteria.operator)
}

// Check total emissions criteria
const checkTotalEmissionsCriteria = (user, criteria) => {
  return evaluateCriteria(user.stats.totalEmissions, criteria.value, criteria.operator)
}

// Check daily average criteria
const checkDailyAverageCriteria = (user, criteria) => {
  return evaluateCriteria(user.stats.averageDaily, criteria.value, criteria.operator)
}

// Check reduction criteria (placeholder - would need historical data)
const checkReductionCriteria = (user, criteria) => {
  // This would require comparing current vs previous periods
  // For now, return false as it needs more complex logic
  return false
}

// Check posts criteria
const checkPostsCriteria = (user, criteria) => {
  return evaluateCriteria(user.social.postsCount, criteria.value, criteria.operator)
}

// Check likes criteria
const checkLikesCriteria = (user, criteria) => {
  return evaluateCriteria(user.social.likesReceived, criteria.value, criteria.operator)
}

// Check custom criteria for specific badges
const checkCustomCriteria = (user, badge, emission) => {
  switch (badge.id) {
    case "first_track":
      return user.stats.totalDaysTracked >= 1

    case "green_week":
      return user.streak.current >= 7

    case "eco_warrior":
      return user.stats.averageDaily < 3.0 && user.stats.totalDaysTracked >= 30

    case "social_butterfly":
      return user.social.postsCount >= 5 && user.social.likesReceived >= 10

    case "perfect_day":
      return emission && emission.totalEmissions < 1.0

    case "transport_hero":
      return (emission && emission.transport.mode === "bike") || emission.transport.mode === "walk"

    case "energy_saver":
      return emission && emission.energy.renewablePercentage >= 50

    case "plant_based":
      return emission && (emission.diet.type === "vegan" || emission.diet.type === "vegetarian")

    default:
      return false
  }
}

// Evaluate criteria based on operator
const evaluateCriteria = (value, target, operator) => {
  switch (operator) {
    case "gte":
      return value >= target
    case "lte":
      return value <= target
    case "eq":
      return value === target
    default:
      return false
  }
}

// Initialize default badges in the database
const initializeDefaultBadges = async () => {
  try {
    const existingBadges = await Badge.countDocuments()
    if (existingBadges > 0) return // Badges already initialized

    const defaultBadges = [
      // Streak badges
      {
        id: "first_track",
        title: "First Steps",
        description: "Track your first day of emissions",
        icon: "🌱",
        category: "streak",
        difficulty: "easy",
        criteria: { type: "custom", value: 1 },
        rewards: { points: 10, title: "Eco Beginner" },
        rarity: "common",
      },
      {
        id: "green_week",
        title: "Green Week",
        description: "Track emissions for 7 consecutive days",
        icon: "📅",
        category: "streak",
        difficulty: "medium",
        criteria: { type: "streak", value: 7, operator: "gte" },
        rewards: { points: 50, title: "Consistent Tracker" },
        rarity: "rare",
      },
      {
        id: "month_master",
        title: "Month Master",
        description: "Track emissions for 30 consecutive days",
        icon: "🏆",
        category: "streak",
        difficulty: "hard",
        criteria: { type: "streak", value: 30, operator: "gte" },
        rewards: { points: 200, title: "Dedication Champion" },
        rarity: "epic",
      },

      // Emission badges
      {
        id: "low_impact",
        title: "Low Impact",
        description: "Maintain daily average below 3kg CO2",
        icon: "🌿",
        category: "emission",
        difficulty: "medium",
        criteria: { type: "daily_average", value: 3.0, operator: "lte" },
        rewards: { points: 75, title: "Eco Conscious" },
        rarity: "rare",
      },
      {
        id: "perfect_day",
        title: "Perfect Day",
        description: "Have a day with less than 1kg CO2 emissions",
        icon: "⭐",
        category: "emission",
        difficulty: "hard",
        criteria: { type: "custom", value: 1.0 },
        rewards: { points: 100, title: "Carbon Minimalist" },
        rarity: "epic",
      },
      {
        id: "eco_warrior",
        title: "Eco Warrior",
        description: "Maintain low emissions for 30+ days",
        icon: "🛡️",
        category: "emission",
        difficulty: "legendary",
        criteria: { type: "custom", value: 30 },
        rewards: { points: 500, title: "Environmental Guardian" },
        rarity: "legendary",
      },

      // Social badges
      {
        id: "first_post",
        title: "First Share",
        description: "Share your first post with the community",
        icon: "📝",
        category: "social",
        difficulty: "easy",
        criteria: { type: "posts", value: 1, operator: "gte" },
        rewards: { points: 25, title: "Community Member" },
        rarity: "common",
      },
      {
        id: "social_butterfly",
        title: "Social Butterfly",
        description: "Get 10 likes on your posts",
        icon: "🦋",
        category: "social",
        difficulty: "medium",
        criteria: { type: "custom", value: 10 },
        rewards: { points: 60, title: "Popular Eco-Advocate" },
        rarity: "rare",
      },
      {
        id: "influencer",
        title: "Eco Influencer",
        description: "Get 100 likes across all posts",
        icon: "📢",
        category: "social",
        difficulty: "hard",
        criteria: { type: "likes", value: 100, operator: "gte" },
        rewards: { points: 300, title: "Green Influencer" },
        rarity: "epic",
      },

      // Challenge badges
      {
        id: "transport_hero",
        title: "Transport Hero",
        description: "Use bike or walk for transportation",
        icon: "🚴",
        category: "challenge",
        difficulty: "easy",
        criteria: { type: "custom", value: 1 },
        rewards: { points: 30, title: "Green Commuter" },
        rarity: "common",
      },
      {
        id: "energy_saver",
        title: "Energy Saver",
        description: "Use 50%+ renewable energy",
        icon: "⚡",
        category: "challenge",
        difficulty: "medium",
        criteria: { type: "custom", value: 50 },
        rewards: { points: 40, title: "Renewable Champion" },
        rarity: "rare",
      },
      {
        id: "plant_based",
        title: "Plant Based",
        description: "Choose vegetarian or vegan diet",
        icon: "🥬",
        category: "challenge",
        difficulty: "medium",
        criteria: { type: "custom", value: 1 },
        rewards: { points: 45, title: "Plant Advocate" },
        rarity: "rare",
      },

      // Milestone badges
      {
        id: "hundred_club",
        title: "Hundred Club",
        description: "Track 100 days of emissions",
        icon: "💯",
        category: "milestone",
        difficulty: "hard",
        criteria: { type: "total_emissions", value: 100, operator: "gte" },
        rewards: { points: 250, title: "Tracking Master" },
        rarity: "epic",
      },
      {
        id: "year_tracker",
        title: "Year Tracker",
        description: "Track emissions for a full year",
        icon: "🗓️",
        category: "milestone",
        difficulty: "legendary",
        criteria: { type: "streak", value: 365, operator: "gte" },
        rewards: { points: 1000, title: "Annual Champion" },
        rarity: "legendary",
      },

      // Special badges
      {
        id: "early_adopter",
        title: "Early Adopter",
        description: "One of the first 1000 users",
        icon: "🌟",
        category: "special",
        difficulty: "legendary",
        criteria: { type: "custom", value: 1000 },
        rewards: { points: 500, title: "Pioneer" },
        rarity: "legendary",
      },
    ]

    await Badge.insertMany(defaultBadges)
    console.log("✅ Default badges initialized successfully")
  } catch (error) {
    console.error("❌ Error initializing badges:", error)
  }
}

module.exports = {
  checkAndAwardBadges,
  initializeDefaultBadges,
}
