import React, { useState, useEffect } from "react";
import { commerce } from "../../../lib/commerce";
import { 
        CircularProgress,
        Divider,
        Button,
        Paper,
        Step,
        StepLabel,
        Stepper,
        Typography
    } from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import Confirmation from "../Confirmation";
import PaymentForm from "../PaymentForm";

const steps = ['Shipping address', 'Payment details'] 

const Checkout = ({ cart }) => {

    const   [activeStep, setActiveStep] = useState(0),
            [checkoutToken, setCheckoutToken] = useState(null),
            [shippingData, setShippingData] = useState({}),
            classes = useStyles();

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={ checkoutToken } next={ next }/> 
    : <PaymentForm checkoutToken={ checkoutToken } shippingData={ shippingData } prevStep={ prevStep }/>;

    useEffect(() => {

        const generateToken = async () => {

            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                
                setCheckoutToken(token);

            } catch (error) {

            }
        }

        generateToken();

    }, [cart]);

    const   nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
            prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {

        setShippingData(data);

        nextStep();

    }

    return (
        <>
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