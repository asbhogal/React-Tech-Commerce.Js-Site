// import { Products, Navbar } from "./components";
import { useState, useEffect } from "react";
import Products from "./products/Products";
import Navbar from "./Navbar/Navbar"
import Cart from "./Cart/Cart";
import Checkout from "./CheckoutForm/Checkout/Checkout";
import { commerce } from "../lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {

    const   [products, setProducts] = useState([]),
            [cart, setCart] = useState({}),
            [order, setOrder] = useState({}),
            [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {

        const { data } = await commerce.products.list();

        setProducts(data);
    };

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

    };

    const handleEmptyCart = async () => {

        const response = await commerce.cart.empty();

        setCart(response);

    };

    const refreshCart = async () => {

        const newCart = await commerce.cart.refresh();

        setCart(cart);

    }

    const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {

        try {

            const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder);

            setOrder(incomingOrder);

            refreshCart();

        } catch (error) {

            setErrorMessage(error.data.error.message);

        }

    }

    useEffect(() => {

        fetchProducts();
        
        fetchCart();

    }, []);

    return (
        <Router>
            <Navbar totalItems={ cart.total_items }/>
            <Routes>
                <Route path='/' element={ <Products products={products} onAddToCart={handleAddToCart} /> } />
                <Route path='/cart' 
                    element={
                        <Cart   cart={cart} 
                                handleUpdateCartQty={ handleUpdateCartQty }
                                handleRemoveFromCart={ handleRemoveFromCart }
                                handleEmptyCart={ handleEmptyCart } 
                        />
                    } 
                />
                <Route path='/checkout' element={
                        <Checkout 
                            cart={ cart }
                            order={ order }
                            onCaptureCheckout={ handleCaptureCheckout }
                            error={ errorMessage }
                        /> 
                    } />
            </Routes>
        </Router>
    )
};

export default App;