import React from "react";
import {
        AppBar,
        Toolbar,
        IconButton,
        Badge,
        MenuItem,
        Menu,
        Typography
    } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import siteLogo from "../../assets/logos/Soeb-USB-symbol.svg";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems }) => {

    const   classes = useStyles(),
            location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={ classes.appBar } color="inherit">
                <Toolbar>
                    <Typography component={ Link } to='/'>
                        <img src={ siteLogo } alt="Commerce.js" height="25px" className={ classes.image }/>
                    </Typography>
                    <div className={ classes.grow } />
                    { location.pathname === '/' && 
                    <div className={ classes.button }>
                        <IconButton component={ Link } to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={ totalItems } color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div> }
                </Toolbar>
            </AppBar>
        </>
    )
};

export default Navbar;