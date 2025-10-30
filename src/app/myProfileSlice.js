import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: null,
  isLoading: false,
  error: null,
};

const myProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setProfileLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProfileError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearProfile: (state) => {
      state.profileData = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setProfileData,
  setProfileLoading,
  setProfileError,
  clearProfile,
} = myProfileSlice.actions;

export default myProfileSlice.reducer;
