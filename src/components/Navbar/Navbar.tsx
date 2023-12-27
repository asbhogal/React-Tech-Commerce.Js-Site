import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
  CardMedia,
  useTheme,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles";
import siteLogo from "@/assets/logos/Soeb-USB-symbol.svg";

const Navbar = ({ totalItems }: { totalItems: any }) => {
  const theme = useTheme();
  const classes = styles(theme);
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" sx={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/">
            <CardMedia
              component="img"
              src={siteLogo}
              alt="Commerce.js"
              height="25px"
              sx={classes.image}
            />
          </Typography>
          <Box sx={classes.grow} />
          {location.pathname === "/" && (
            <Box>
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
