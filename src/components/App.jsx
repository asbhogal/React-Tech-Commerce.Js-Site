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

    };

    const handleAddToCart = async (productId, quantity) => {

        const item = await commerce.cart.add(productId, quantity);

        setCart(item);

    };

    const handleUpdateCartQty = async (productId, quantity) => {

        const response = await commerce.cart.update(productId, { quantity });

        setCart(response);
    };

    const handleRemoveFromCart = async (productId) => {

        const response = await commerce.cart.remove(productId);

        setCart(response);

    }

    const handleEmptyCart = async () => {

        const cart = await commerce.cart.empty();

        setCart(cart);
    }

    useEffect(() => {

        fetchProducts();
        fetchCart();

    }, []);

    // console.log(products);
    // console.log(cart);

    return (
        <Router>
            <Navbar totalItems={ cart.total_items }/>
            <Routes>
                <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
                <Route path='/cart' 
                    element={
                        <Cart   cart={cart} 
                                handleUpdateCartQty={ handleUpdateCartQty }
                                handleRemoveFromCart={ handleRemoveFromCart }
                                handleEmptyCart={ handleEmptyCart } 
                        />
                    } 
                />
            </Routes>
        </Router>
    )
}

export default App;