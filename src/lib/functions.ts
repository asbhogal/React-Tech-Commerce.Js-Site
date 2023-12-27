export type StylesCreator<Styles> = (theme: any) => Styles;

export function createThemedStyles<Styles>(
  stylesCreator: StylesCreator<Styles>
) {
  return (theme: any) => stylesCreator(theme);
}
