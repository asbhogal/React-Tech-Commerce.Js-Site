import React from "react";
import {
        Container,
        Typography,
        Button,
        Grid
} from "@material-ui/core";

const Cart = () => {

    const isEmpty = true;

    const EmptyCart = () => (
        <Typography variant="subtitle1">Your cart is currently empty</Typography>
    )

    const FilledCart = () => (
        <>
            
        </>
    )

    return (
        <Container>
            <div className={ classes.toolbar } />
            <Typography className={ classes.title } variant="h3">Shopping Cart</Typography>
            { isEmpty ? <EmptyCart/> : <FilledCart/> }
        </Container>
    )
}

export default Cart;