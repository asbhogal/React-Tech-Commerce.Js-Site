import React from "react";
import Grid from "@material-ui/core";

const productList = [
    {
        id: 1,
        name: 'Charging cable',
        description: 'A 1.5m charging cable',
        price: '$14.99'
    },
    {
        id: 2,
        name: 'Apple MacBook',
        description: 'A silver Apple MacBook',
        price: '$699.99'
    }
];

const Products = () => {
    <main>
        <Grid container justify="center" spacing={ 4 }>
            { productList.map((product) => (
                <Grid item key={ product.id } xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                    <Product product={ product }/>
                </Grid>
            )) }
        </Grid>
    </main>
}

export default Products;