import React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import {apiURL} from "../../../constants.ts";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";

interface Props {
  id: string;
  title: string;
  price: number;
  image: string | null;
  category: string;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%' //16:9
});

const ProductItem: React.FC<Props> = ({id, title, price, image, category}) => {
  const user = useAppSelector(selectUser);
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }


  return (
    <Grid item xs={12} sm={12} md={6} lg={4} gap={2}>
      <Card>
        <CardHeader title={title} />
        <ImageCardMedia image={cardImage} title={title} />
        <CardContent>
          <p>
            <strong>Category: {category}</strong>
          </p>
          <strong>{price} KGS</strong>
        </CardContent>
        <CardActions>
          <Grid item>
            <IconButton component={Link} to={`/products/${id}`}>
              <ArrowForwardIcon/>
            </IconButton>
          </Grid>
          <Grid item>
            { user?.role === 'admin' && (
                <Button component={Link} to={`/products/${id}/edit`}>Edit</Button>
            )}
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;