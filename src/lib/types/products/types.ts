export interface Price {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

export interface Inventory {
  managed: boolean;
  available: number;
}

export interface Conditionals {
  is_active: boolean;
  is_tax_exempt: boolean;
  is_pay_what_you_want: boolean;
  is_inventory_managed: boolean;
  is_sold_out: boolean;
  has_digital_delivery: boolean;
  has_physical_delivery: boolean;
  has_images: boolean;
  collects_fullname: boolean;
  collects_shipping_address: boolean;
  collects_billing_address: boolean;
  collects_extra_fields: boolean;
}

export interface Image {
  id: string;
  url: string;
  description: string | null;
  is_image: boolean;
  filename: string;
  file_size: number;
  file_extension: string;
  image_dimensions: {
    width: number;
    height: number;
  };
  meta: [];
  created_at: number;
  updated_at: number;
}

export interface Product {
  id: string;
  created: number;
  updated: number;
  active: boolean;
  permalink: string;
  name: string;
  description: string;
  price: Price;
  inventory: Inventory;
  sku: string | null;
  sort_order: number;
  seo: {
    title: string | null;
    description: string | null;
  };
  thank_you_url: string | null;
  meta: [];
  conditionals: Conditionals;
  is: {
    active: boolean;
    tax_exempt: boolean;
    pay_what_you_want: boolean;
    inventory_managed: boolean;
    sold_out: boolean;
  };
  has: {
    digital_delivery: boolean;
    physical_delivery: boolean;
    images: boolean;
  };
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
  checkout_url: {
    checkout: string;
    display: string;
  };
  categories: [];
  image: Image;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
      links: {};
    };
  };
}

export interface LineItem {
  id: string;
  product_id: string;
  name: string;
  product_name: string;
  sku: string | null;
  permalink: string;
  quantity: number;
  price: Price;
  line_total: Price;
  is_valid: boolean;
  product_meta: [];
  selected_options: [];
  variant: null;
  image: Image;
  tax: null;
}

export interface Cart {
  id: string;
  created: number;
  updated: number;
  expires: number;
  total_items: number;
  total_unique_items: number;
  subtotal: Price;
  hosted_checkout_url: string;
  meta: null;
  line_items: LineItem[];
  currency: {
    code: string;
    symbol: string;
  };
  discount: [];
}

export interface newOrder {
  customer: Customer;
  fulfillment: {
    shipping_method: string;
  };
  line_items: LineItems[];
  payment: {
    gateway: string;
    stripe: {
      payment_method_id: string;
    };
  };
  shipping: Shipping;
}

export interface Customer {
  cell_number: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface Shipping {
  country: string;
  county_state: string;
  name: "Primary";
  property: string;
  property_code: string;
  street: string;
  town: string;
}

export interface LineItems {
  id: string;
  image: Image;
  line_total: Price;
  name: string;
  permalink: string;
  price: Price;
  product_id: string;
  product_meta: [];
  product_name: string;
  quantity: number;
  selected_options: [];
  sku: null;
  tax: {
    amount: null;
    breakdown: null;
    is_taxable: boolean;
    taxable_amount: null;
  };
  variant: null;
}
