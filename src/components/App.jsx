// import { Products, Navbar } from "./components";
import { useState, useEffect } from "react";
import Products from "./products/Products";
import Navbar from "./Navbar/Navbar"
import Cart from "./Cart/Cart";
import { commerce } from "../lib/commerce"

const App = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {

        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {

        setCart(await commerce.cart.retrieve());

    }

    const handleAddToCart = async (productId, quantity) => {

        const item = await commerce.cart.add(productId, quantity);

        setCart(item);

    };

    useEffect(() => {

        fetchProducts();
        fetchCart();

    }, []);

    // console.log(products);
    console.log(cart);

    return (
        <div>
            <Navbar totalItems={ cart.total_items }/>
            { /*<Products products={ products } onAddToCart={ handleAddToCart }/>*/ }
            <Cart cart={ cart }></Cart>
        </div>
    )
}

export default App;