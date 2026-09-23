import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header>
      <div className="logoimg">
        <Link to="/">
          <img src="/product_9504576.png" alt="site logo" />
        </Link>
      </div>

      <nav>
        <Link to="/">Home</Link>

        {token && role === "admin" && (
          <>
            <Link to="/add-product">Add Product</Link>
            <Link to="/product-view">Products</Link>
          </>
        )}

        {token ? (
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}

        {token && (
          <Link to="/profile" className="profile-icon">
            <FaUserCircle size={28} />
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;