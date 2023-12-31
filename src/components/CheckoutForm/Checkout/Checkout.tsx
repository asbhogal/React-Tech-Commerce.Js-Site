import React, { useState, useEffect } from "react";
import { commerce } from "../../../lib/commerce";
import {
  CircularProgress,
  CssBaseline,
  Divider,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
  Container,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import styles from "./styles";
import { CheckoutToken } from "@/lib/types/payment/types";
import { ShippingData } from "@/lib/types/shipping/types";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({
  cart,
  order,
  onCaptureCheckout,
  error,
}: {
  cart: any;
  order: any;
  onCaptureCheckout: any;
  error: any;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken | undefined>(
    undefined
  );
  const [shippingData, setShippingData] = useState<Partial<ShippingData>>({});
  const [isFinished, setIsFinished] = useState(false);

  const Navigate = useNavigate();
  const theme = useTheme();
  const classes = styles(theme);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch (error) {
        Navigate("/");
      }
    };

    generateToken();
  }, [cart]);

  const next = (data: any) => {
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname},{" "}
            {order.customer.lastname}. You will receive a confirmation email
            shortly.
          </Typography>
          <Divider sx={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back To Home
        </Button>
      </>
    ) : isFinished ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </Typography>
          <Divider sx={classes.divider} />
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back To Home
        </Button>
      </>
    ) : (
      <Box sx={classes.spinner}>
        <CircularProgress />
      </Box>
    );

  if (error) {
    <>
      <Typography variant="h5">Error: {error} </Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back To Home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        prevStep={prevStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        timeout={timeout}
      />
    );

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={classes.toolbar}></Box>
      <Container sx={classes.layout}>
        <Paper sx={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Checkout;
