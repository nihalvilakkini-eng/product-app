import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Profile from "./pages/profile";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AddProduct from "./pages/Addproducts";
import Productview from "./pages/Productview";
import ProductDetails from "./pages/Productdetails";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRouter";


function Layout({ children }) {
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app-container">

      {!hideHeaderFooter && <Header />}

      <main>
        {children}
      </main>

      {!hideHeaderFooter && <Footer />}

    </div>
  );
}


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

  return (
    <BrowserRouter>

      <Layout>

       <Routes>

  {/* Public pages - only for users who are NOT logged in */}
  <Route
    path="/login"
    element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    }
  />

  <Route
    path="/register"
    element={
      <PublicRoute>
        <Register />
      </PublicRoute>
    }
  />

  {/* Home */}
  <Route path="/" element={<Home />} />

  {/* Private pages - only for logged-in users */}
  <Route
    path="/add-product"
    element={
      <PrivateRoute>
        <AddProduct />
      </PrivateRoute>
    }
  />

  <Route
  path="/product-view"
  element={
    <PrivateRoute>
      <Productview />
    </PrivateRoute>
  }
/>

<Route
  path="/product/:id"
  element={
    <PrivateRoute>
      <ProductDetails />
    </PrivateRoute>
  }
/>
<Route
  path="/edit-product/:id"
  element={
    <PrivateRoute>
      <AddProduct />
    </PrivateRoute>
  }
/>
<Route
  path="/edit-product/:id"
  element={
    <PrivateRoute>
      <AddProduct />
    </PrivateRoute>
  }
/>
<Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>
</Routes>
      </Layout>

    </BrowserRouter>
  );
}

export default App;