type Styles = {
  root: {
    maxWidth: string;
  };
  media: {
    height: number;
    paddingTop: string;
  };
  cardActions: {
    display: string;
    flexDirection: string;
  };
  cardContent: {
    display: string;
    justifyContent: string;
  };
};

const styles: Styles = {
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  cardActions: {
    display: "flex",
    flexDirection: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default styles;
