import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import Product from "./Product/Product";
import styles from "./styles";
import { useCartContext } from "@/hooks/useCartContext";

const Products = () => {
  const { products } = useCartContext();
  const theme = useTheme();
  const classes = styles(theme);
  return (
    <Box component="main" sx={classes.content}>
      <Box sx={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
