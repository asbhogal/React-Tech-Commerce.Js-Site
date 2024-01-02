import { Theme } from "@mui/material";

export type StylesCreator<Styles> = (theme: Theme) => Styles;

export function createThemedStyles<Styles>(
  stylesCreator: StylesCreator<Styles>
) {
  return (theme: Theme) => stylesCreator(theme);
}
