import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api"
import toast from "react-hot-toast"

// Async thunks
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", { email, password })

    if (response.data.success) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      toast.success("Login successful!")
      return response.data
    }
  } catch (error) {
    const message = error.response?.data?.message || "Login failed"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/register", userData)

    if (response.data.success) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      toast.success("Registration successful!")
      return response.data
    }
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token || !user) {
      return rejectWithValue("No authentication data found")
    }

    // Verify token with server
    const response = await api.get("/auth/me")

    if (response.data.success) {
      return {
        token,
        user: response.data.user,
      }
    }
  } catch (error) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return rejectWithValue("Authentication failed")
  }
})

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await api.post("/auth/logout")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
    return true
  } catch (error) {
    // Even if server request fails, clear local storage
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return true
  }
})

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/refresh")

    if (response.data.success) {
      localStorage.setItem("token", response.data.token)
      return response.data.token
    }
  } catch (error) {
    return rejectWithValue("Token refresh failed")
  }
})

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = action.payload
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = action.payload
      })

      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = null
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = null
        state.loading = false
      })

      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload
      })
  },
})

export const { clearError, updateUser, setLoading } = authSlice.actions
export default authSlice.reducer
