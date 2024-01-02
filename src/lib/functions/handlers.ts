import { LineItems, newOrder } from "@/lib/types/products/types";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import { CheckoutToken } from "../types/payment/types";
import { ShippingData } from "../types/shipping/types";

export const submitPayment = async (
  event: React.FormEvent<HTMLFormElement>,
  elements: StripeElements | null,
  stripe: Stripe | null,
  checkoutToken: CheckoutToken | undefined,
  shippingData: ShippingData,
  onCaptureCheckout: (checkoutTokenID: string, newOrder: newOrder) => void,
  timeout: () => void,
  nextStep: () => void
) => {
  event.preventDefault();

  if (!stripe || !elements) return;

  const cardElement = elements.getElement(CardElement);

  if (!cardElement) {
    console.log("Card Element not found");
    return;
  }

  const { paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: cardElement,
  });

  if (!paymentMethod) {
    console.log("Payment method creation failed");
    return;
  }

  /*  const validatedShippingData = ShippingDataSchema.safeParse(shippingData);

  if (!validatedShippingData.success) {
    console.error(validatedShippingData.error);
    return;
  } */

  const lineItems: LineItems[] = checkoutToken!.line_items.map((item) => ({
    ...item,
    sku: null,
    tax: {
      amount: null,
      breakdown: null,
      is_taxable: false,
      taxable_amount: null,
    },
  }));

  const orderData = {
    line_items: lineItems,
    customer: {
      firstname: shippingData.firstName,
      lastname: shippingData.lastName,
      email: shippingData.emailAddress,
      cell_number: shippingData.cellNumber,
    },
    shipping: {
      name: "Primary",
      property: shippingData.propertyNumber,
      street: shippingData.addressLine1,
      town: shippingData.town,
      property_code: shippingData.ZipPostCode,
      county_state: shippingData.shippingSubdivision,
      country: shippingData.shippingCountry,
    },
    fulfillment: {
      shipping_method: shippingData.shippingOption,
    },
    payment: {
      gateway: "stripe",

      stripe: {
        payment_method_id: paymentMethod.id,
      },
    },
  };

  if (checkoutToken) {
    onCaptureCheckout(checkoutToken.id, orderData);
    timeout();
    nextStep();
  }
};
