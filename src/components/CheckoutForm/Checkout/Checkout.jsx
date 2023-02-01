import React, { useState } from "react";
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

const Checkout = () => {

    const   [activeStep, setActiveStep] = useState(0),
            classes = useStyles();

    const Form = () => activeStep === 0 
    ? <AddressForm /> 
    : <PaymentForm />;

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
                    { activeStep === steps.length ? <Confirmation /> : <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout;