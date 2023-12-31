import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, useTheme } from "@mui/material";

import CartContextProvider from "@/context/CartContext";
import AppRoutes from "./components/AppRoutes";

const App = () => {
  const theme = useTheme();

  return (
    <CartContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </CartContextProvider>
  );
};

export default App;
