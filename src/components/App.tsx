// import { Products, Navbar } from "./components";
import React from "react";
import { useState, useEffect } from "react";
import Products from "./products/Products";
import Navbar from "./Navbar/Navbar";
import Cart from "./Cart/Cart";
import Checkout from "./CheckoutForm/Checkout/Checkout";
import { commerce } from "../lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CircularProgress, ThemeProvider, useTheme } from "@mui/material";
import {
  Cart as CartInterface,
  Product,
  newOrder,
} from "@/lib/types/products/types";
import { CartContext } from "@/context/CartContext";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartInterface | null>(null);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = (await commerce.products.list()) as { data: Product[] };

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    const item = (await commerce.cart.add(
      productId,
      quantity
    )) as CartInterface;

    setCart(item);
  };

  const handleUpdateCartQty = async (productId: string, quantity: number) => {
    const response = (await commerce.cart.update(productId, {
      quantity,
    })) as CartInterface;

    setCart(response);
  };

  const handleRemoveFromCart = async (productId: string) => {
    const response = (await commerce.cart.remove(productId)) as CartInterface;

    setCart(response);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (
    checkoutTokenID: string,
    newOrder: newOrder
  ) => {
    console.log("hnandleCaptureCheckout is called");
    console.log("checkoutTokenID", checkoutTokenID);
    console.log("newOrder", newOrder);
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenID,
        newOrder
      );
      console.log(incomingOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error: any) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();

    fetchCart();
  }, []);

  const theme = useTheme();

  return (
    <CartContext.Provider value={{ products, onAddToCart: handleAddToCart }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar totalItems={cart?.total_items} />
          <Routes>
            <Route path="/" element={<Products products={products} />} />
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
        </Router>
      </ThemeProvider>
    </CartContext.Provider>
  );
};

export default App;
