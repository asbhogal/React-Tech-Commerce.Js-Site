import { createThemedStyles } from "@/lib/functions";
import { CSSProperties } from "react";

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

const stylesCreator = (theme: any): Styles => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
});

export default createThemedStyles(stylesCreator);
