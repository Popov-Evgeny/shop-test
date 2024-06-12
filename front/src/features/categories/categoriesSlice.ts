import {Category} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchCategories} from "./categoriesThunk.ts";

interface CategoriesState {
    items: Category[];
    fetchLoading: boolean;
}

const initialState: CategoriesState = {
    items: [],
    fetchLoading: false,
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
            state.fetchLoading = false;
            state.items = categories;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectFetchLoading = (state: RootState) => state.categories.fetchLoading;