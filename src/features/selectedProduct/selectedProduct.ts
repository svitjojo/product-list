import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { RootState } from "../../app/store";
import { getProduct } from "../../api/products";

export interface SelectedProductState {
  item: Product | null;
  loaded: boolean;
  hasError: boolean;
}

export const initialState: SelectedProductState = {
  item: null,
  loaded: false,
  hasError: false,
};

export const getProductData = createAsyncThunk(
  "products/fetchProducts",
  async (productId: number) => {
    const products = await getProduct(productId);

    return products;
  }
);

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductData.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        state.loaded = true;
        state.item = action.payload;
      })
      .addCase(getProductData.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const selectSelectedProduct = (state: RootState) =>
  state.selectedProduct;

export default selectedProductSlice.reducer;
