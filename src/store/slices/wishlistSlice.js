// src/store/slices/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: JSON.parse(localStorage.getItem('movieWishlist') || '[]'),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      state.wishlist.push(action.payload);
      localStorage.setItem('movieWishlist', JSON.stringify(state.wishlist));
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(movie => movie.id !== action.payload);
      localStorage.setItem('movieWishlist', JSON.stringify(state.wishlist));
    },
    toggleWishlist(state, action) {
      const exists = state.wishlist.find(movie => movie.id === action.payload.id);
      if (exists) {
        state.wishlist = state.wishlist.filter(movie => movie.id !== action.payload.id);
      } else {
        state.wishlist.push(action.payload);
      }
      // 로컬 스토리지에 즉시 저장
      localStorage.setItem('movieWishlist', JSON.stringify(state.wishlist));
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
