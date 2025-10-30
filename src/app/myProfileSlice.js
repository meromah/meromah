import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: null,
  isProfileDataLoading: false,
  profileDataError: null,
};

const myProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
      state.isProfileDataLoading = false;
      state.profileDataError = null;
    },
    setProfileLoading: (state, action) => {
      state.isProfileDataLoading = action.payload;
    },
    setProfileError: (state, action) => {
      state.profileDataError = action.payload;
      state.isProfileDataLoading = false;
    },
    clearProfile: (state) => {
      state.profileData = null;
      state.profileDataError = null;
      state.isProfileDataLoading = false;
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
