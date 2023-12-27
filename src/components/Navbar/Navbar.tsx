import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles";

const Navbar = ({ totalItems }: { totalItems: any }) => {
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" sx={styles.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/">
            <CardMedia
              component="img"
              src="./src/assets/logos/Soeb-USB-symbol.svg"
              alt="Commerce.js"
              height="25px"
              sx={styles.image}
            />
          </Typography>
          <Box sx={styles.grow} />
          {location.pathname === "/" && (
            <Box sx={styles.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
                size="large"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
