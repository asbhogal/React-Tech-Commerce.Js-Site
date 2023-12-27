import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Product from "./Product/Product";
import styles from "./styles";

const Products = ({
  products,
  onAddToCart,
}: {
  products: any;
  onAddToCart: any;
}) => {
  return (
    <Container sx={styles.content}>
      <Box sx={styles.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
