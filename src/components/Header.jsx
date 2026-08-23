import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="logoimg">
            <a href="/">
           <img src="public/product_9504576.png" alt="site logo"></img>
            </a>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/add-product">Add Product</Link>
                <Link to="/product-view">Product View</Link>
            </nav>
        </header>
    );
}

export default Header;