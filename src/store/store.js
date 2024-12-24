// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './slices/wishlistSlice';
// import authReducer from './slices/authSlice'; // 삭제

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    // auth: authReducer, // 삭제
  },
});

export default store;
