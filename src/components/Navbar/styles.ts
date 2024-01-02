import { createThemedStyles } from "@/lib/functions/styles";
import { alpha } from "@mui/material";
import { CSSProperties } from "react";

const drawerWidth = 0;

type Breakpoint = {
  [key: string]: string | number | CSSProperties;
};

type Styles = {
  appBar: {
    boxShadow: string;
    borderBottom: string;
    [key: string]: string | Breakpoint;
  };
  title: {
    flexGrow: number;
    alignItems: string;
    display: string;
    textDecoration: string;
  };
  image: {
    objectFit: string;
    marginRight: string;
  };
  menuButton: {
    marginRight: string;
    [key: string]: string | Breakpoint;
  };
  button: {
    marginLeft: string;
    marginTop: string;
  };
  grow: {
    flexGrow: number;
  };
  search: {
    position: string;
    borderRadius: number;
    backgroundColor: string;
    "&:hover": {
      backgroundColor: string;
    };
    marginRight: string;
    marginLeft: number;
    width: string;
    [key: string]: string | number | Breakpoint;
  };
  searchIcon: {
    padding: string;
    height: string;
    position: string;
    pointerEvents: string;
    display: string;
    alignItems: string;
    justifyContent: string;
  };
  inputRoot: {
    color: string;
  };
  inputInput: {
    padding: string;
    paddingLeft: string;
    transition: string;
    width: string;
    [key: string]: string | Breakpoint;
  };
};

const stylesCreator = (theme: any): Styles => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
  },
  image: {
    objectFit: "contain",
    marginRight: "10px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
});

export default createThemedStyles(stylesCreator);
