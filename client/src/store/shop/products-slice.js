import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Async thunks
export const fetchAllFilteredProducts = createAsyncThunk(
  "shopProducts/fetchAllFilteredProducts",
  async ({ filterParams = {}, sortParams = "price-lowtohigh" }) => {
    try {
      const response = await axios.get(`${BASE_URL}/shop/products`, {
        params: {
          filters: JSON.stringify(filterParams),
          sort: sortParams,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "shopProducts/fetchProductDetails",
  async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/shop/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

// Initial state
const initialState = {
  productList: [],
  productDetails: null,
  loading: false,
  error: null,
};

// Slice
const shopProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      state.productList = state.productList.map(product => 
        product._id === updatedProduct._id ? updatedProduct : product
      );
      if (state.productDetails?._id === updatedProduct._id) {
        state.productDetails = updatedProduct;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.products;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload.product;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const {
  setProductDetails,
  clearProductDetails,
  setProductList,
  updateProduct
} = shopProductsSlice.actions;

// Export reducer
export default shopProductsSlice.reducer;
