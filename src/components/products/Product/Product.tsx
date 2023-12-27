import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import DOMPurify from "dompurify";
import styles from "./styles";

const Product = ({
  product,
  onAddToCart,
}: {
  product: any;
  onAddToCart: any;
}) => {
  const data = product.description;

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data),
  });

  return (
    <Card sx={styles.root}>
      <CardMedia
        sx={styles.media}
        image={product.image.url}
        title={product.name}
      />
      <CardContent>
        <Box sx={styles.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>
        </Box>
        <Typography
          dangerouslySetInnerHTML={sanitizedData()}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing sx={styles.cardActions}>
        <IconButton
          aria-label="Add To Cart"
          onClick={() => onAddToCart(product.id, 1)}
          size="large"
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
