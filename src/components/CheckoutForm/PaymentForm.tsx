import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
import { z } from "zod";
import { PaymentFormPropTypes } from "@/lib/types/props/types";
import { submitPayment } from "@/lib/functions/handlers";

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
}: PaymentFormPropTypes) => {
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
            <form
              onSubmit={(e) =>
                submitPayment(
                  e,
                  elements,
                  stripe,
                  checkoutToken,
                  shippingData,
                  onCaptureCheckout,
                  timeout,
                  nextStep
                )
              }
            >
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
