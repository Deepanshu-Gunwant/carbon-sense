import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api"
import toast from "react-hot-toast"

// Async thunks
export const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users/profile")

    if (response.data.success) {
      return response.data.user
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch profile"
    return rejectWithValue(message)
  }
})

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put("/users/profile", profileData)

      if (response.data.success) {
        toast.success("Profile updated successfully!")
        return response.data.user
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update profile"
      toast.error(message)
      return rejectWithValue(message)
    }
  },
)

export const updateUserPreferences = createAsyncThunk(
  "user/updateUserPreferences",
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await api.put("/users/preferences", preferences)

      if (response.data.success) {
        toast.success("Preferences updated successfully!")
        return response.data.preferences
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update preferences"
      toast.error(message)
      return rejectWithValue(message)
    }
  },
)

export const fetchUserStats = createAsyncThunk("user/fetchUserStats", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users/stats")

    if (response.data.success) {
      return response.data.stats
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch stats"
    return rejectWithValue(message)
  }
})

export const fetchUserAchievements = createAsyncThunk("user/fetchUserAchievements", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users/achievements")

    if (response.data.success) {
      return response.data
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch achievements"
    return rejectWithValue(message)
  }
})

export const followUser = createAsyncThunk("user/followUser", async (userId, { rejectWithValue }) => {
  try {
    const response = await api.post(`/users/follow/${userId}`)

    if (response.data.success) {
      toast.success(response.data.message)
      return {
        userId,
        isFollowing: response.data.isFollowing,
      }
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to follow user"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const searchUsers = createAsyncThunk("user/searchUsers", async ({ query, limit = 10 }, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users/search?q=${encodeURIComponent(query)}&limit=${limit}`)

    if (response.data.success) {
      return response.data.users
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to search users"
    return rejectWithValue(message)
  }
})

export const fetchLocations = createAsyncThunk("user/fetchLocations", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users/locations")

    if (response.data.success) {
      return response.data.locations
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch locations"
    return rejectWithValue(message)
  }
})

const initialState = {
  profile: null,
  stats: null,
  achievements: {
    badges: [],
    streak: { current: 0, longest: 0 },
  },
  locations: [],
  searchResults: [],
  following: [],
  loading: false,
  statsLoading: false,
  achievementsLoading: false,
  locationsLoading: false,
  searchLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSearchResults: (state) => {
      state.searchResults = []
    },
    updateUserGoals: (state, action) => {
      if (state.profile) {
        state.profile.goals = action.payload
      }
    },
    addBadge: (state, action) => {
      state.achievements.badges.push(action.payload)
    },
    updateStreak: (state, action) => {
      state.achievements.streak = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update User Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload
      })

      // Update User Preferences
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.preferences = action.payload
        }
      })

      // Fetch User Stats
      .addCase(fetchUserStats.pending, (state) => {
        state.statsLoading = true
        state.error = null
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.statsLoading = false
        state.stats = action.payload
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.statsLoading = false
        state.error = action.payload
      })

      // Fetch User Achievements
      .addCase(fetchUserAchievements.pending, (state) => {
        state.achievementsLoading = true
        state.error = null
      })
      .addCase(fetchUserAchievements.fulfilled, (state, action) => {
        state.achievementsLoading = false
        state.achievements = action.payload
      })
      .addCase(fetchUserAchievements.rejected, (state, action) => {
        state.achievementsLoading = false
        state.error = action.payload
      })

      // Follow User
      .addCase(followUser.fulfilled, (state, action) => {
        const { userId, isFollowing } = action.payload
        if (isFollowing) {
          state.following.push(userId)
        } else {
          state.following = state.following.filter((id) => id !== userId)
        }
      })

      // Search Users
      .addCase(searchUsers.pending, (state) => {
        state.searchLoading = true
        state.error = null
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.payload
      })

      // Fetch Locations
      .addCase(fetchLocations.pending, (state) => {
        state.locationsLoading = true
        state.error = null
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locationsLoading = false
        state.locations = action.payload
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.locationsLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearSearchResults, updateUserGoals, addBadge, updateStreak } = userSlice.actions

export default userSlice.reducer
