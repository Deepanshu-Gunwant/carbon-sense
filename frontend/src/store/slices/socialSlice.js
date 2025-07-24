import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api"
import toast from "react-hot-toast"

// Async thunks
export const fetchSocialFeed = createAsyncThunk(
  "social/fetchSocialFeed",
  async ({ page = 1, limit = 10, type = "all", country, state } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit })
      if (type !== "all") params.append("type", type)
      if (country) params.append("country", country)
      if (state) params.append("state", state)

      const response = await api.get(`/social/feed?${params}`)

      if (response.data.success) {
        return response.data
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch social feed"
      return rejectWithValue(message)
    }
  },
)

export const createPost = createAsyncThunk("social/createPost", async (postData, { rejectWithValue }) => {
  try {
    const response = await api.post("/social/posts", postData)

    if (response.data.success) {
      toast.success("Post created successfully!")
      return response.data.post
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to create post"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const likePost = createAsyncThunk("social/likePost", async (postId, { rejectWithValue }) => {
  try {
    const response = await api.post(`/social/${postId}/like`)

    if (response.data.success) {
      return {
        postId,
        isLiked: response.data.isLiked,
        likeCount: response.data.likeCount,
      }
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to like post"
    return rejectWithValue(message)
  }
})

export const addComment = createAsyncThunk("social/addComment", async ({ postId, content }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/social/${postId}/comment`, { content })

    if (response.data.success) {
      toast.success("Comment added successfully!")
      return {
        postId,
        comment: response.data.comment,
      }
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to add comment"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const sharePost = createAsyncThunk("social/sharePost", async ({ postId, platform }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/social/${postId}/share`, { platform })

    if (response.data.success) {
      toast.success(`Shared to ${platform}!`)
      return {
        postId,
        shareCount: response.data.shareCount,
      }
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to share post"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const fetchMyPosts = createAsyncThunk(
  "social/fetchMyPosts",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(`/social/posts/my?page=${page}&limit=${limit}`)

      if (response.data.success) {
        return response.data
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch your posts"
      return rejectWithValue(message)
    }
  },
)

export const deletePost = createAsyncThunk("social/deletePost", async (postId, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/social/posts/${postId}`)

    if (response.data.success) {
      toast.success("Post deleted successfully!")
      return postId
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to delete post"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const fetchTrendingPosts = createAsyncThunk(
  "social/fetchTrendingPosts",
  async (limit = 10, { rejectWithValue }) => {
    try {
      const response = await api.get(`/social/trending?limit=${limit}`)

      if (response.data.success) {
        return response.data.posts
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch trending posts"
      return rejectWithValue(message)
    }
  },
)

const initialState = {
  posts: [],
  myPosts: [],
  trendingPosts: [],
  pagination: {
    current: 1,
    pages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  },
  myPostsPagination: {
    current: 1,
    pages: 1,
    total: 0,
  },
  loading: false,
  myPostsLoading: false,
  trendingLoading: false,
  error: null,
  filters: {
    type: "all",
    country: null,
    state: null,
  },
}

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearPosts: (state) => {
      state.posts = []
      state.pagination = initialState.pagination
    },
    clearMyPosts: (state) => {
      state.myPosts = []
      state.myPostsPagination = initialState.myPostsPagination
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Social Feed
      .addCase(fetchSocialFeed.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSocialFeed.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload.posts
        state.pagination = action.payload.pagination
      })
      .addCase(fetchSocialFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload)
        state.myPosts.unshift(action.payload)
      })

      // Like Post
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, isLiked, likeCount } = action.payload

        // Update in posts array
        const postIndex = state.posts.findIndex((p) => p._id === postId)
        if (postIndex !== -1) {
          state.posts[postIndex].isLiked = isLiked
          state.posts[postIndex].likeCount = likeCount
        }

        // Update in myPosts array
        const myPostIndex = state.myPosts.findIndex((p) => p._id === postId)
        if (myPostIndex !== -1) {
          state.myPosts[myPostIndex].isLiked = isLiked
          state.myPosts[myPostIndex].likeCount = likeCount
        }

        // Update in trending posts
        const trendingIndex = state.trendingPosts.findIndex((p) => p._id === postId)
        if (trendingIndex !== -1) {
          state.trendingPosts[trendingIndex].isLiked = isLiked
          state.trendingPosts[trendingIndex].likeCount = likeCount
        }
      })

      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload

        // Update in posts array
        const postIndex = state.posts.findIndex((p) => p._id === postId)
        if (postIndex !== -1) {
          state.posts[postIndex].comments.push(comment)
          state.posts[postIndex].commentCount += 1
        }

        // Update in myPosts array
        const myPostIndex = state.myPosts.findIndex((p) => p._id === postId)
        if (myPostIndex !== -1) {
          state.myPosts[myPostIndex].comments.push(comment)
          state.myPosts[myPostIndex].commentCount += 1
        }
      })

      // Share Post
      .addCase(sharePost.fulfilled, (state, action) => {
        const { postId, shareCount } = action.payload

        // Update in posts array
        const postIndex = state.posts.findIndex((p) => p._id === postId)
        if (postIndex !== -1) {
          state.posts[postIndex].shareCount = shareCount
        }

        // Update in myPosts array
        const myPostIndex = state.myPosts.findIndex((p) => p._id === postId)
        if (myPostIndex !== -1) {
          state.myPosts[myPostIndex].shareCount = shareCount
        }
      })

      // Fetch My Posts
      .addCase(fetchMyPosts.pending, (state) => {
        state.myPostsLoading = true
        state.error = null
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.myPostsLoading = false
        state.myPosts = action.payload.posts
        state.myPostsPagination = action.payload.pagination
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.myPostsLoading = false
        state.error = action.payload
      })

      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload
        state.posts = state.posts.filter((p) => p._id !== postId)
        state.myPosts = state.myPosts.filter((p) => p._id !== postId)
      })

      // Fetch Trending Posts
      .addCase(fetchTrendingPosts.pending, (state) => {
        state.trendingLoading = true
        state.error = null
      })
      .addCase(fetchTrendingPosts.fulfilled, (state, action) => {
        state.trendingLoading = false
        state.trendingPosts = action.payload
      })
      .addCase(fetchTrendingPosts.rejected, (state, action) => {
        state.trendingLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, setFilters, clearPosts, clearMyPosts } = socialSlice.actions
export default socialSlice.reducer
