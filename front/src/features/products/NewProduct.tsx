import { Typography } from '@mui/material';
import ProductForm from './components/ProductForm.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { ProductMutation } from '../../types';
import { createProduct } from './productsThunk.ts';

const NewProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (productMutation: ProductMutation) => {
    try {
      await dispatch(createProduct(productMutation)).unwrap();
      navigate('/');
    } catch {
      // error
    }
  }

  return (
    <>
      <Typography variant="h4">New product</Typography>
      <ProductForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewProduct;