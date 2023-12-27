import { useTheme } from "@mui/material";
import { CSSProperties } from "react";
const theme = useTheme();

type Styles = {
  toolbar: CSSProperties;
  content: {
    flexGrow: number;
    backgroundColor: string;
    padding: string;
  };
  root: {
    flexGrow: number;
  };
};

const styles: Styles = {
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
};

export default styles;
