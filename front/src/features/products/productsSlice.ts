import { Product } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {createProduct, fetchOneProduct, fetchProducts, updateProduct} from './productsThunk.ts';

interface ProductsState {
  items: Product[];
  product: Product | null;
  fetchLoading: boolean;
  updateProductLoading: boolean;
  fetchOneProductLoading: boolean;
  createLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  product: null,
  fetchLoading: false,
  updateProductLoading: false,
  fetchOneProductLoading: false,
  createLoading: false,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
      state.fetchLoading = false;
      state.items = products;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneProduct.pending, (state) => {
      state.fetchOneProductLoading = true;
    });
    builder.addCase(fetchOneProduct.fulfilled, (state, {payload: product}) => {
      state.fetchOneProductLoading = false;
      state.product = product;
    });
    builder.addCase(fetchOneProduct.rejected, (state) => {
      state.fetchOneProductLoading = false;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.updateProductLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.updateProductLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.updateProductLoading = false;
    });
  }
});

export const productsReducer = productsSlice.reducer;

export const selectProduct = (state: RootState) => state.products.product;
export const selectProducts = (state: RootState) => state.products.items;
export const selectFetchLoading = (state: RootState) => state.products.fetchLoading;
export const selectFetchOneProductLoading = (state: RootState) => state.products.fetchOneProductLoading;
export const selectUpdateProductLoading = (state: RootState) => state.products.updateProductLoading;