import React from "react";
import { Typography, Button, Divider, CircularProgress } from "@mui/material";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";

import { Stripe, StripeElements, loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
import { CheckoutToken } from "@/lib/types/payment/types";
import { ShippingData } from "@/lib/types/shipping/types";
import { LineItems, newOrder } from "@/lib/types/products/types";
import { z } from "zod";

const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

if (!stripeKey) {
  throw new Error("Stripe key is not defined");
}

const stripePromise = loadStripe(stripeKey);

/* const ShippingDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  propertyNumber: z.string(),
  addressLine1: z.string(),
  town: z.string(),
  ZipPostCode: z.string().min(5, "Your postal code is incomplete"),
  emailAddress: z.string().email(),
  cellNumber: z.string(),
  shippingCountry: z.string(),
  shippingRegion: z.string(),
  shippingOption: z.string(),
  shippingSubdivision: z.string(),
}); */

const PaymentForm = ({
  checkoutToken,
  shippingData,
  prevStep,
  onCaptureCheckout,
  nextStep,
  timeout,
}: {
  checkoutToken?: CheckoutToken;
  shippingData: ShippingData;
  prevStep: () => void;
  onCaptureCheckout: (checkoutTokenID: string, newOrder: newOrder) => void;
  nextStep: () => void;
  timeout: () => void;
}) => {
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    elements: StripeElements | null,
    stripe: Stripe | null
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

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!stripe}
                >
                  Pay {checkoutToken?.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
