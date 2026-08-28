import { Link,useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();
    return (
        <header>
            <div className="logoimg">
            <a href="/">
           <img src="public/product_9504576.png" alt="site logo"></img>
            </a>
            </div>
            <nav>
                  {location.pathname !== "/" && (
                    <Link to="/">Home</Link>
                )}

                <Link to="/add-product">Add Product</Link>
                <Link to="/product-view">Product View</Link>
                <Link to="/product-details">Product Details</Link>
            </nav>
        </header>
    );
}

export default Header;