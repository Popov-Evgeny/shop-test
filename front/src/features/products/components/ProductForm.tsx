import React, {useEffect, useMemo, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from '@mui/material';
import {ProductMutation} from '../../../types';
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCategories} from "../../categories/categoriesSlice.ts";
import {fetchCategories} from "../../categories/categoriesThunk.ts";

interface Props {
    onSubmit: (mutation: ProductMutation) => void;
    isEdit?: boolean;
    initialProduct?: ProductMutation;
    existingImage?: string | null;
}

const initialState = {
    category: '',
    title: '',
    price: '',
    description: '',
    image: null,
    isDeletedImage: null,
};

const ProductForm: React.FC<Props> = ({onSubmit, isEdit = false, initialProduct = initialState, existingImage}) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const [state, setState] = useState<ProductMutation>(initialProduct);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    const checkFilename = useMemo(() => {
        if (state.image instanceof File) {
            return state.image.name;
        } else if (state.isDeletedImage === 'delete') {
            return undefined;
        } else if (existingImage) {
            return existingImage;
        }
    }, [state.image, existingImage, state.isDeletedImage]);

    const onImageClear = () => {
        setState(prevState => ({
            ...prevState,
            image: null,
            isDeletedImage: 'delete',
        }));
    }

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        select
                        id="category" label="Category"
                        value={categories.length > 0 ? state.category : ''}
                        onChange={inputChangeHandler}
                        name="category"
                        required
                    >
                        <MenuItem value="" disabled>Please select a category</MenuItem>
                        {categories.length > 0 && categories.map(category => (
                            <MenuItem
                                key={category._id}
                                value={category._id}
                            >
                                {category.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        id="title" label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                    />
                </Grid>

                <Grid item xs>
                    <TextField
                        id="price" label="Price"
                        value={state.price}
                        onChange={inputChangeHandler}
                        name="price"
                    />
                </Grid>

                <Grid item xs>
                    <TextField
                        multiline rows={3}
                        id="description" label="Description"
                        value={state.description}
                        onChange={inputChangeHandler}
                        name="description"
                    />
                </Grid>

                <Grid item xs>
                    <FileInput
                        onChange={fileInputChangeHandler}
                        name="image"
                        label="Image"
                        fileName={checkFilename}
                        onClear={onImageClear}
                    />
                </Grid>

                <Grid item xs>
                    <Button type="submit" color="primary" variant="contained">{isEdit ? 'Edit' : 'Create'}</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;