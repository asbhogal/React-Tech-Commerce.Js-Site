import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import styles from "./styles";
import { CartItemPropTypes } from "@/lib/types/props/types";

const CartItem = ({
  item,
  onUpdateCartQty,
  onRemoveFromCart,
}: CartItemPropTypes) => {
  return (
    <Card>
      <CardMedia
        component="img"
        sx={styles.media}
        image={item.image.url}
        alt={item.name}
      />
      <CardContent sx={styles.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>

      <CardActions sx={styles.cartActions}>
        <Box sx={styles.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            &#45;
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            &#43;
          </Button>
        </Box>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => onRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
