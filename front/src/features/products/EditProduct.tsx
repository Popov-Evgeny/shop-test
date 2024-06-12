import {CircularProgress, Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectFetchOneProductLoading, selectProduct} from "./productsSlice.ts";
import {useCallback, useEffect} from "react";
import {fetchOneProduct, updateProduct} from "./productsThunk.ts";
import ProductForm from "./components/ProductForm.tsx";
import {ProductMutation} from "../../types";

const EditProduct = () => {
    const navigate = useNavigate();
    const {id} = useParams() as { id: string };

    const dispatch = useAppDispatch();
    const product = useAppSelector(selectProduct);
    const isFetching = useAppSelector(selectFetchOneProductLoading);

    const fetchOne = useCallback(async () => {
        try {
            dispatch(fetchOneProduct(id)).unwrap();
        } catch (e) {
            navigate('/404');
        }
    }, [dispatch, id, navigate])

    useEffect(() => {
        void fetchOne();
    }, [fetchOne]);

    const onFormSubmit = async (productMutation: ProductMutation) => {
        await dispatch(updateProduct({
            productMutation,
            productId: id,
        }));
        navigate('/');
    }

    let form = <CircularProgress/>;

    if (!isFetching && product) {
        const mutation: ProductMutation = {
            category: product.category._id,
            title: product.title,
            description: product.description,
            price: product.price.toString(),
            image: null,
            isDeletedImage: null,
        }

        form = <ProductForm isEdit onSubmit={onFormSubmit} initialProduct={mutation} existingImage={product.image} />
    }


    return (
        <Grid container direction="column" gap={2}>
            <Typography variant="h4">Edit product</Typography>
            {form}
        </Grid>
    );
};

export default EditProduct;