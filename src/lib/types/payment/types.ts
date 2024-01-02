import { LineItem, Price } from "../products/types";

export interface CheckoutToken {
  id: string;
  cart_id: string;
  currency: {
    code: string;
    symbol: string;
  };
  subtotal: Price;
  total: Price;
  total_with_tax: Price;
  giftcard: [];
  total_due: Price;
  pay_what_you_want: {
    enabled: boolean;
    minimum: null | number;
    customer_set_price: null | number;
  };
  conditionals: {
    collects_fullname: boolean;
    collects_shipping_address: boolean;
    collects_billing_address: boolean;
    has_physical_delivery: boolean;
    has_digital_delivery: boolean;
    has_pay_what_you_want: boolean;
    has_available_discounts: boolean;
    collects_extra_fields: boolean;
    is_cart_free: boolean;
  };
  meta: null;
  created: number;
  updated: number;
  expires: number;
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
  has: {
    physical_delivery: boolean;
    digital_delivery: boolean;
    pay_what_you_want: boolean;
    available_discounts: boolean;
  };
  is: {
    cart_free: boolean;
  };
  line_items: LineItem[];
  extra_fields: [];
  shipping: {
    price: Price;
  };
  shipping_methods: {
    id: string;
    description: string;
    provider: string;
    price: Price;
  }[];
  discount: [];
  adjustments: {
    taxable: Price;
    untaxable: Price;
    total: Price;
    breakdown: [];
  };
  tax: {
    amount: Price;
    included_in_price: boolean;
    provider: string;
    breakdown: [];
    zone: [];
  };
  gateways: {
    id: string;
    code: string;
    sandbox: boolean;
    config: [];
  }[];
}
