// src/features/recentCommunities/recentCommunitiesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Key for localStorage
const STORAGE_KEY = "recentCommunities";
// Maximum quantity which local storage can have
const MAX_ITEMS = 10;

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading recent communities:", err);
    return [];
  }
};

const saveToStorage = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Error saving recent communities:", err);
  }
};

const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Error clearing recent communities:", err);
  }
};

// --- Thunk to load from localStorage ---
export const loadRecentCommunities = createAsyncThunk(
  "recentCommunities/load",
  async () => {
    return loadFromStorage();
  }
);

// --- Slice ---
const recentCommunitiesSlice = createSlice({
  name: "recentCommunities",
  initialState: {
    list: [],
  },
  reducers: {
    addRecentCommunity: (state, action) => {
      const newItem = action.payload; // {id, title, to}
      state.list = state.list.filter((x) => x.id !== newItem.id); // removing existing by id
      state.list.unshift(newItem); // putting newItem to the first

      // limit to MAX_ITEMS items
      state.list = state.list.slice(0, MAX_ITEMS);

      // Save updated list
      saveToStorage(state.list);
    },
    clearRecentCommunities: (state) => {
      state.list = [];
      clearStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRecentCommunities.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { addRecentCommunity, clearRecentCommunities } =
  recentCommunitiesSlice.actions;

export default recentCommunitiesSlice.reducer;
