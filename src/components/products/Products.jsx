import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import chargingCable from "../../assets/images/charging-cable-cropped.png";
import deskLamp from "../../assets/images/desk-lamp.jpg";
import appleMacbook from "../../assets/images/apple-macbook.jpg";

const productList = [
    {
        id: 1,
        name: 'Charging cable',
        description: 'A 1.5m charging cable',
        price: '$14.99',
        image: chargingCable
    },
    {
        id: 2,
        name: 'Apple MacBook',
        description: 'A silver Apple MacBook',
        price: '$699.99',
        image: appleMacbook
    },
    {
        id: 3,
        name: 'Desk Lamp',
        description: 'Redefine your environment',
        price: '$49.99',
        image: deskLamp
    }
];

const Products = () => {
    return (
        <main>
            <Grid container justifyContent="center" spacing={ 4 }>
                { productList.map((product) => (
                    <Grid item key={ product.id } xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                        <Product product={ product }/>
                    </Grid>
                )) }
            </Grid>
        </main>
    )
}

export default Products;