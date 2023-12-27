import { useTheme } from "@mui/material";
import { CSSProperties } from "react";
const theme = useTheme();

type Breakpoint = {
  [key: string]: string;
};

type Styles = {
  toolbar: CSSProperties;
  title: {
    marginTop: string;
  };
  emptyButton: {
    minWidth: string;
    [key: string]: string | Breakpoint;
  };
  checkoutButton: {
    minWidth: string;
  };
  link: {
    textDecoration: string;
  };
  cardDetails: {
    display: string;
    marginTop: string;
    width: string;
    justifyContent: string;
  };
};

const styles: Styles = {
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "5%",
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
  },
  link: {
    textDecoration: "none",
  },
  cardDetails: {
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between",
  },
};

export default styles;
