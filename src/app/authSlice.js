import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // For now i am going to give False as a value for isAuthenticated state, later on i will think about to manage thoroughly
  isAuthenticated: false,
  access_token: null, // short-lived, memory only
  refresh_token: localStorage.getItem('refresh_token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      if (refresh_token) {
        state.refresh_token = refresh_token;
        localStorage.setItem('refresh_token', refresh_token);
      }
    },
    clearCredentials: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      localStorage.removeItem('refresh_token');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
