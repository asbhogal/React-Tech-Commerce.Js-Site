import { CheckoutToken } from "../payment/types";
import { Cart, newOrder } from "../products/types";
import { ShippingData } from "../shipping/types";

export interface AddressFormPropTypes {
  checkoutToken?: CheckoutToken;
  next: (data: ShippingData) => void;
}

export interface CartItemPropTypes {
  item: any;
  onUpdateCartQty: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
}

export interface CartPropTypes {
  cart: Cart;
  handleUpdateCartQty: any;
  handleRemoveFromCart: any;
  handleEmptyCart: () => void;
}

export interface CheckoutPropTypes {
  cart: Cart;
  order: any;
  onCaptureCheckout: (checkoutTokenID: string, newOrder: newOrder) => void;
  error: string;
  handleEmptyCart: () => void;
}

export interface PaymentFormPropTypes {
  checkoutToken?: CheckoutToken;
  shippingData: ShippingData;
  prevStep: () => void;
  onCaptureCheckout: (checkoutTokenID: string, newOrder: newOrder) => void;
  nextStep: () => void;
  timeout: () => void;
}
