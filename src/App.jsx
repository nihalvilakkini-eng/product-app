import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AddProduct from "./pages/Addproducts";
import Productview from "./pages/Productview";
import ProductDetails from "./pages/Productdetails";
function App() {

    const [products, setProducts] = useState([]);

const addProduct = (product) => {
    setProducts([...products, product]);
};

 const updateProduct = (id, updatedProduct) => {

        const updatedProducts = [...products];

        updatedProducts[id] = updatedProduct;

        setProducts(updatedProducts);
    };
const limitWords = (text, limit) => {
    const words = text.split(" ");

    if (words.length <= limit) {
        return text;
    }

    return words.slice(0, limit).join(" ") + "...";
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
                <Route path="/product/:id" element={<ProductDetails products={products} />}/>
               <Route path="/edit-product/:id" element={<AddProduct products={products}updateProduct={updateProduct}/>}/>
              
            </Routes>
</main>
            <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;