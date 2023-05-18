import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { createProduct, getProducts } from "../../api/products";
import { RootState } from "../../app/store";

export interface ProductsState {
  items: Product[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: ProductsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getProductsData = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await getProducts();

    return products;
  }
);

interface Test {
  name: string;
  count: number;
  weight: string;
  sizeWidth: number;
  sizeHeight: number;
}

export const addProduct = createAsyncThunk(
  "products/add",
  async (data: Test) => {
    const { name, count, weight, sizeHeight, sizeWidth } = data;
    const preparedData = {
      id: Math.random() + Math.random(),
      size: {
        width: sizeWidth,
        height: sizeHeight,
      },
      imageUrl: "example",
      name,
      count,
      weight,
      comments: [],
    };

    const newProduct = await createProduct(preparedData);

    return newProduct;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getProductsData.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getProductsData.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loaded = true;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
