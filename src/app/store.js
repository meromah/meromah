import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import myProfileReducer from "./myProfileSlice"
import recentCommunitiesReducer, { recentCommunitiesMiddleware } from "./recentCommunitiesSlice"
import { baseApi } from "../services/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    myProfile: myProfileReducer,
    recentCommunities: recentCommunitiesReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(recentCommunitiesMiddleware),

});
