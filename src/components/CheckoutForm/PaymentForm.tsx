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

const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

if (!stripeKey) {
  throw new Error("Stripe key is not defined");
}

const stripePromise = loadStripe(stripeKey);

const PaymentForm = ({
  checkoutToken,
  shippingData,
  prevStep,
  onCaptureCheckout,
  nextStep,
  timeout,
}: {
  checkoutToken?: CheckoutToken;
  shippingData: Partial<ShippingData>;
  prevStep: () => void;
  onCaptureCheckout: (arg1: string, arg2: object) => void;
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

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken?.line_items,

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
          town_city: shippingData.town,
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

      checkoutToken ? (
        onCaptureCheckout(checkoutToken.id, orderData)
      ) : (
        <CircularProgress />
      );

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
