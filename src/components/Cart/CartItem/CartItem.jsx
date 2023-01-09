import React from "react";
import {
    Typography, 
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia
} from "@material-ui/core";

import useStyles from "./styles"

const CartItem = ({ item }) => {
    console.log(item);

    const classes = useStyles();

    return (
        <Card>
            <CardMedia className={ classes.media } image={ item.image.url } alt="item.name"/>
            <CardContent className={classes.CardContent}>
                <Typography variant="h4">{ item.name }</Typography>
                <Typography variant="h5">{ item.line_total.formatted_with_symbol }</Typography>
            </CardContent>

            <CardActions className={ classes.CardActions }>
                <div className={ classes.buttons }>
                    <Button type="button" size="small">&#45;</Button>
                    <Typography>{ item.quantity }</Typography>
                    <Button type="button" size="small">&#43;</Button>
                </div>
                <Button variant="contained" type="button" color="secondary">Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;