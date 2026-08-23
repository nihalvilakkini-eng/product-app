import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AddProduct from "./pages/Addproducts";
import Productview from "./pages/Productview";
function App() {

     const [products, setProducts] = useState([]);

     const addProduct = (product) => {
        setProducts([...products, product]);
    };

    return (
        <BrowserRouter>
        <div className="app-container">
            <Header />
<main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-product" element={<AddProduct addProduct={addProduct}/>} />
                <Route path="/product-view" element={<Productview products={products}/>}/>
            </Routes>
</main>
            <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;