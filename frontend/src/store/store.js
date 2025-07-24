import { configureStore } from "@reduxjs/toolkit"
import { ReturnType } from "react"
import authSlice from "./slices/authSlice"
import themeSlice from "./slices/themeSlice"
import emissionSlice from "./slices/emissionSlice"
import socialSlice from "./slices/socialSlice"
import userSlice from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    emissions: emissionSlice,
    social: socialSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
