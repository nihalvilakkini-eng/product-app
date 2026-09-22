import { Routes, Route, Navigate,useLocation } from "react-router-dom";
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

function AppContent({ products, addProduct, updateProduct }) {

  const location = useLocation();

  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app-container">

      {!hideHeaderFooter && <Header />}

      <main>

        <Routes>

          {/* App open cheyyumbol Login page */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Register */}
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Home */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Add Product */}
          <Route
            path="/add-product"
            element={
              <PrivateRoute>
                <AddProduct addProduct={addProduct} />
              </PrivateRoute>
            }
          />

          {/* Product View */}
          <Route
            path="/product-view"
            element={
              <PrivateRoute>
                <Productview products={products} />
              </PrivateRoute>
            }
          />

          {/* Product Details */}
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails products={products} />
              </PrivateRoute>
            }
          />

          {/* Edit Product */}
          <Route
            path="/edit-product/:id"
            element={
              <PrivateRoute>
                <AddProduct
                  products={products}
                  updateProduct={updateProduct}
                />
              </PrivateRoute>
            }
          />

        </Routes>

      </main>

      {!hideHeaderFooter && <Footer />}

    </div>
  );
}

export default AppContent;