// src/features/recentCommunities/recentCommunitiesSlice.js

import { createSlice } from "@reduxjs/toolkit";

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

// --- Slice ---
const recentCommunitiesSlice = createSlice({
  name: "recentCommunities",
  initialState: {
    list: loadFromStorage(), // Load from localStorage on initialization
  },
  reducers: {
    addRecentCommunity: (state, action) => {
      const newItem = action.payload; // {id, title, to}
      
      // Validate payload
      if (!newItem || !newItem.id) {
        console.error("Invalid community item:", newItem);
        return;
      }

      // Remove existing item with same id and add new item to front
      const filtered = state.list.filter((x) => x.id !== newItem.id);
      state.list = [newItem, ...filtered].slice(0, MAX_ITEMS);
    },
    clearRecentCommunities: (state) => {
      state.list = [];
    },
  },
});

export const { addRecentCommunity, clearRecentCommunities } =
  recentCommunitiesSlice.actions;

export default recentCommunitiesSlice.reducer;

// --- Middleware to sync with localStorage ---
export const recentCommunitiesMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Sync to localStorage after any recentCommunities action
  if (action.type?.startsWith('recentCommunities/')) {
    const state = store.getState();
    
    if (action.type === 'recentCommunities/clearRecentCommunities') {
      clearStorage();
    } else if (action.type === 'recentCommunities/addRecentCommunity') {
      saveToStorage(state.recentCommunities.list);
    }
  }
  
  return result;
};