import { createContext, useContext } from "react";

import { CartContextType } from "@/lib/types/context/types";

export const CartContext = createContext<CartContextType>({
  products: [],
  order: {},
  cart: null,
  errorMessage: "",
  onAddToCart: () => {},
  handleUpdateCartQty: () => {},
  handleRemoveFromCart: () => {},
  handleEmptyCart: () => {},
  handleCaptureCheckout: () => {},
  refreshCart: () => {},
});

export function useCartContext() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error(
      "useCartContext must be used within a CartContextProvider "
    );
  }

  return cartContext;
}
