import {createAsyncThunk} from '@reduxjs/toolkit';
import {Product, ProductMutation, UpdateProductArg} from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchProducts = createAsyncThunk<Product[]>(
    'fetchProducts',
    async () => {
        const productsResponse = await axiosApi.get<Product[]>('/products');
        return productsResponse.data;
    }
);

export const fetchOneProduct = createAsyncThunk<Product, string>(
    'fetchOneProduct',
    async (id) => {
        const productsResponse = await axiosApi.get<Product>(`/products/${id}`);
        return productsResponse.data;
    }
);

export const createProduct = createAsyncThunk<void, ProductMutation>(
    'createProduct',
    async (productMutation) => {
        const formData = new FormData();

        const keys = Object.keys(productMutation) as (keyof ProductMutation)[];

        keys.forEach(key => {
            const value = productMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post('/products', formData);
    }
);

export const updateProduct = createAsyncThunk<void, UpdateProductArg>(
    'updateProduct',
    async ({productId, productMutation}) => {
        const formData = new FormData();

        const keys = Object.keys(productMutation) as (keyof ProductMutation)[];

        keys.forEach(key => {
            const value = productMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.patch(`/products/${productId}`, formData);
    }
);