import { CSSProperties } from "react";
import { createThemedStyles } from "@/lib/functions";

type Breakpoint = {
  width: number;
  marginLeft: string;
  marginRight: string;
};

type Styles = {
  appBar: {
    position: string;
  };
  toolbar: CSSProperties;
  layout: {
    marginTop: string;
    width: string;
    marginLeft: string;
    marginRight: string;
    [key: string]: string | number | Breakpoint;
  };
  paper: {
    marginTop: string;
    marginBottom: string;
    padding: string;
  };
  stepper: {
    padding: string;
  };
  buttons: {
    display: string;
    justifyContent: string;
  };
  button: {
    marginTop: string;
    marginLeft: string;
  };
  divider: {
    margin: string;
  };
  spinner: {
    display: string;
    justifyContent: string;
    alignItems: string;
  };
};

const stylesCreator = (theme: any): Styles => ({
  appBar: {
    position: "relative",
  },
  toolbar: theme.mixins.toolbar,
  layout: {
    marginTop: "5%",
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + parseInt(theme.spacing(2)) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: 60,
    },
    [theme.breakpoints.up(600 + parseInt(theme.spacing(3)) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: "20px 0",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default createThemedStyles(stylesCreator);
