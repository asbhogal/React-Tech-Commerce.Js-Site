import { Product } from "@/lib/types/products/types";
import { createContext, useContext } from "react";
import { Cart as CartInterface } from "@/lib/types/products/types";
import { newOrder } from "@/lib/types/products/types";

type CartContextType = {
  products: Product[];
  cart: CartInterface | null;
  order: any;
  errorMessage: string;
  onAddToCart: (productId: string, quantity: number) => void;
  handleUpdateCartQty: (productId: string, quantity: number) => void;
  handleRemoveFromCart: (productId: string) => void;
  handleEmptyCart: () => void;
  handleCaptureCheckout: (checkoutTokenId: string, newOrder: newOrder) => void;
  refreshCart: () => void;
};

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
