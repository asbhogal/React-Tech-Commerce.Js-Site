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

const steps = ['Shipping', 'Payment'] 

const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0);

    render (
        <>
            <div className={ classes.toolbar }></div>
            <main className={ classes.layout }>
                <Paper className={ classes.paper }>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={ 0 } className={ classes.Stepper }>
                        {steps.map((step) => (
                            <Step key={ step }>
                                <StepLabel>{ step }</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>
            </main>
        </>
    )
}

export default Checkout;