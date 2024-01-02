type Styles = {
  media: {
    height: number;
  };
  cardContent: {
    display: string;
    justifyContent: string;
  };
  cartActions: {
    justifyContent: string;
  };
  buttons: {
    display: string;
    alignItems: string;
  };
};

const styles: Styles = {
  media: {
    height: 260,
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartActions: {
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
  },
};

export default styles;
