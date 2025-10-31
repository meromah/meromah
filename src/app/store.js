import { configureStore } from "@reduxjs/toolkit";
import { publicApi } from "../services/public/publicApi";
import authReducer from "./authSlice";
import myProfileReducer from "./myProfileSlice"
import recentCommunitiesReducer, { recentCommunitiesMiddleware } from "./recentCommunitiesSlice"
import { privateApi } from "../services/private/privateApi";

export const store = configureStore({
  reducer: {
    [publicApi.reducerPath]: publicApi.reducer,
    [privateApi.reducerPath]: privateApi.reducer,
    auth: authReducer,
    myProfile: myProfileReducer,
    recentCommunities: recentCommunitiesReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(publicApi.middleware)
      .concat(privateApi.middleware)
      .concat(recentCommunitiesMiddleware),

});
