import React from "react";
import Products from "./products/Products";
import Navbar from "./Navbar/Navbar";
import Cart from "./Cart/Cart";
import Checkout from "./CheckoutForm/Checkout/Checkout";
import { Routes, Route } from "react-router-dom";
import { useCartContext } from "@/hooks/useCartContext";
import { CircularProgress } from "@mui/material";

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
            cart ? (
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
                handleEmptyCart={handleEmptyCart}
              />
            ) : (
              <CircularProgress />
            )
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
