import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import selectedProductReducer from "../features/selectedProduct/selectedProduct";
import commentsReducer from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    selectedProduct: selectedProductReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
