import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import CartItem from "./CartItem/CartItem";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import styles from "./styles";
import { CartPropTypes } from "@/lib/types/props/types";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}: CartPropTypes) => {
  const theme = useTheme();
  const classes = styles(theme);
  const navigate = useNavigate();
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Your cart is currently empty.<br></br>
      <Link href="/" sx={classes.link}>
        Return to shop
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item: any) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            sx={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            sx={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </Button>
        </div>
      </Box>
    </>
  );

  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <Box sx={classes.toolbar} />
      <Typography sx={classes.title} variant="h3">
        Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
