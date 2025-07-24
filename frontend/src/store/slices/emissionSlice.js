import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api"
import toast from "react-hot-toast"

// Async thunks
export const addEmission = createAsyncThunk("emissions/addEmission", async (emissionData, { rejectWithValue }) => {
  try {
    const response = await api.post("/emissions", emissionData)

    if (response.data.success) {
      toast.success("Emission record added successfully!")
      return response.data
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to add emission record"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const fetchEmissions = createAsyncThunk(
  "emissions/fetchEmissions",
  async ({ page = 1, limit = 30, startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit })
      if (startDate) params.append("startDate", startDate)
      if (endDate) params.append("endDate", endDate)

      const response = await api.get(`/emissions?${params}`)

      if (response.data.success) {
        return response.data
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch emissions"
      return rejectWithValue(message)
    }
  },
)

export const fetchAnalytics = createAsyncThunk(
  "emissions/fetchAnalytics",
  async (period = "30", { rejectWithValue }) => {
    try {
      const response = await api.get(`/emissions/analytics?period=${period}`)

      if (response.data.success) {
        return response.data.analytics
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch analytics"
      return rejectWithValue(message)
    }
  },
)

export const updateEmission = createAsyncThunk(
  "emissions/updateEmission",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/emissions/${id}`, data)

      if (response.data.success) {
        toast.success("Emission record updated successfully!")
        return response.data.emission
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update emission record"
      toast.error(message)
      return rejectWithValue(message)
    }
  },
)

export const deleteEmission = createAsyncThunk("emissions/deleteEmission", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/emissions/${id}`)

    if (response.data.success) {
      toast.success("Emission record deleted successfully!")
      return id
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to delete emission record"
    toast.error(message)
    return rejectWithValue(message)
  }
})

const initialState = {
  emissions: [],
  analytics: null,
  pagination: {
    current: 1,
    pages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  },
  statistics: {
    total: 0,
    average: 0,
    count: 0,
  },
  loading: false,
  analyticsLoading: false,
  error: null,
  selectedPeriod: "30",
}

const emissionSlice = createSlice({
  name: "emissions",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSelectedPeriod: (state, action) => {
      state.selectedPeriod = action.payload
    },
    clearEmissions: (state) => {
      state.emissions = []
      state.pagination = initialState.pagination
      state.statistics = initialState.statistics
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Emission
      .addCase(addEmission.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addEmission.fulfilled, (state, action) => {
        state.loading = false
        state.emissions.unshift(action.payload.emission)
        state.statistics.total += action.payload.emission.totalEmissions
        state.statistics.count += 1
        state.statistics.average = state.statistics.total / state.statistics.count
      })
      .addCase(addEmission.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch Emissions
      .addCase(fetchEmissions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmissions.fulfilled, (state, action) => {
        state.loading = false
        state.emissions = action.payload.emissions
        state.pagination = action.payload.pagination
        state.statistics = action.payload.statistics
      })
      .addCase(fetchEmissions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch Analytics
      .addCase(fetchAnalytics.pending, (state) => {
        state.analyticsLoading = true
        state.error = null
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analyticsLoading = false
        state.analytics = action.payload
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.analyticsLoading = false
        state.error = action.payload
      })

      // Update Emission
      .addCase(updateEmission.fulfilled, (state, action) => {
        const index = state.emissions.findIndex((e) => e._id === action.payload._id)
        if (index !== -1) {
          state.emissions[index] = action.payload
        }
      })

      // Delete Emission
      .addCase(deleteEmission.fulfilled, (state, action) => {
        state.emissions = state.emissions.filter((e) => e._id !== action.payload)
        state.statistics.count = Math.max(0, state.statistics.count - 1)
      })
  },
})

export const { clearError, setSelectedPeriod, clearEmissions } = emissionSlice.actions
export default emissionSlice.reducer
