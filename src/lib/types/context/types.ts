import { Cart as CartInterface } from "@/lib/types/products/types";
import { newOrder } from "@/lib/types/products/types";
import { Product } from "@/lib/types/products/types";

export type CartContextProviderType = {
  children: React.ReactNode;
};

export type CartContextType = {
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
