// src/features/slice/apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//  Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'api/fetchProducts',
  async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
  }
);

const initialState = {
  products: [],
  status: 'idle', 
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null; // clear old errors
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default apiSlice.reducer;
