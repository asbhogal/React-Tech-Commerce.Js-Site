// import { Products, Navbar } from "./components";

import Products from "./products/Products";
import Navbar from "./Navbar/Navbar"
import { commerce } from "../lib/commerce"

const App = () => {
    return (
        <div>
            <Navbar />
            <Products />
        </div>
    )
}

export default App;