import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // For now i am going to give False as a value for isAuthenticated state, later on i will think about to manage thoroughly
  isAuthenticated: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
});

export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
