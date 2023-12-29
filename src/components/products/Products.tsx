import React from "react";
import { Box, Container, Grid, useTheme } from "@mui/material";
import Product from "./Product/Product";
import styles from "./styles";

const Products = ({
  products,
  onAddToCart,
}: {
  products: any;
  onAddToCart: any;
}) => {
  const theme = useTheme();
  const classes = styles(theme);
  return (
    <Box component="main" sx={classes.content}>
      <Box sx={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;