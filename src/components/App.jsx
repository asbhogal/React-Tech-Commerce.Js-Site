// import { Products, Navbar } from "./components";
import { useState } from "react";
import Products from "./products/Products";
import Navbar from "./Navbar/Navbar"
import { commerce } from "../lib/commerce"

const App = () => {

    const [products, setProducts] = useState([]);

    return (
        <div>
            <Navbar />
            <Products />
        </div>
    )
}

export default App;