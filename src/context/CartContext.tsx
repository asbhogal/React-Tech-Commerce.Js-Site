import { Product } from "@/lib/types/products/types";
import { createContext } from "react";

type CartContextType = {
  products: Product[];
  onAddToCart: (productId: string, quantity: number) => void;
};

export const CartContext = createContext<CartContextType>({
  products: [],
  onAddToCart: () => {},
});
