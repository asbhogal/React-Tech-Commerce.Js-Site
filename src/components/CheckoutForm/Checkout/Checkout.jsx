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
        Typography
    } from "@material-ui/core";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ['Shipping address', 'Payment details']; 

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

    const   [activeStep, setActiveStep] = useState(0),
            [checkoutToken, setCheckoutToken] = useState(null),
            [shippingData, setShippingData] = useState({}),
            [isFinished, setIsFinished] = useState(false);
    
    const   classes = useStyles(),
            Navigate = useNavigate();
    
    const   nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
            prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    useEffect(() => {

        const generateToken = async () => {

            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                
                setCheckoutToken(token);

            } catch (error) {

                Navigate('/');

            }
        }

        generateToken();

    }, [cart]);

    const next = (data) => {

        setShippingData(data);

        nextStep();

    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname}, {order.customer.lastname}. You will receive a confirmation email shortly.</Typography>
                <Divider className={ classes.divider } />
                <Typography variant="subtitle2">Order ref: { order.customer_reference }</Typography>
            </div>
            <br />
            <Button component={ Link } to="/" variant="outlined" type="button">Back To Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase. You will receive a confirmation email shortly.</Typography>
                <Divider className={ classes.divider } />
            </div>
            <br />
            <Button component={ Link } to="/" variant="outlined" type="button">Back To Home</Button>
        </>
    ) :  (
        <div className={ classes.spinner }>
            <CircularProgress />
        </div>
    );
    
    if (error) {
        <>
            <Typography variant="h5">Error: { error } </Typography>
            <br />
            <Button component={ Link } to="/" variant="outlined" type="button">Back To Home</Button>
        </>
    }
    
    const Form = () => activeStep === 0 
    ? <AddressForm 
            checkoutToken={ checkoutToken } 
            next={ next }
        /> 

    : <PaymentForm 
            checkoutToken={ checkoutToken } 
            shippingData={ shippingData } 
            prevStep={ prevStep } 
            onCaptureCheckout={ onCaptureCheckout }
            nextStep={ nextStep }
            timeout={ timeout }
        />;

    const timeout = () => {

        setTimeout(() => {

            setIsFinished(true)

        }, 3000);

    }

    return (
        <>
        <CssBaseline />
            <div className={ classes.toolbar }></div>
            <main className={ classes.layout }>
                <Paper className={ classes.paper }>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={ activeStep } className={ classes.Stepper }>
                        {steps.map((step) => (
                            <Step key={ step }>
                                <StepLabel>{ step }</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout;