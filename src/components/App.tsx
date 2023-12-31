import React from "react";
import Products from "./products/Products";
import Navbar from "./Navbar/Navbar";
import Cart from "./Cart/Cart";
import Checkout from "./CheckoutForm/Checkout/Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CircularProgress, ThemeProvider, useTheme } from "@mui/material";

import CartContextProvider from "@/context/CartContext";
import { useCartContext } from "@/hooks/useCartContext";

const App = () => {
  const theme = useTheme();

  return (
    <CartContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </CartContextProvider>
  );
};

const AppRoutes = () => {
  const {
    cart,
    order,
    errorMessage,
    handleCaptureCheckout,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart,
  } = useCartContext();

  return (
    <>
      <Navbar totalItems={cart?.total_items} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route
          path="/cart"
          element={
            cart ? (
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            ) : (
              <CircularProgress />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
