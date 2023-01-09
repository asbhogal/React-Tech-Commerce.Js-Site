// import { Products, Navbar } from "./components";
import { useState, useEffect } from "react";
import Products from "./products/Products";
import Navbar from "./Navbar/Navbar"
import Cart from "./Cart/Cart";
import { commerce } from "../lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        <Router>
            <Navbar totalItems={ cart.total_items }/>
            <Routes>
                <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
                <Route path='/cart' element={<Cart cart={cart} />} />
            </Routes>
        </Router>
    )
}

export default App;