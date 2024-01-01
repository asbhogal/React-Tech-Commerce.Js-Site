import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";
import { CartContext } from "@/hooks/useCartContext";
import {
  Cart as CartInterface,
  Product,
  newOrder,
} from "@/lib/types/products/types";
import { CartContextProviderType } from "@/lib/types/context/types";

export default function CartContextProvider({
  children,
}: CartContextProviderType) {
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
  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        order,
        errorMessage,
        onAddToCart: handleAddToCart,
        handleUpdateCartQty,
        handleRemoveFromCart,
        handleEmptyCart,
        handleCaptureCheckout,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
