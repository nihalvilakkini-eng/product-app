import { useNavigate , Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
function Header() {
    const navigate = useNavigate();
const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("token");
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
  <Link to="/">HOME</Link>

  {role === "admin" && (
    <>
      <Link to="/add-product">ADD PRODUCT</Link>
      <Link to="/product-view">PRODUCTS</Link>
    </>
  )}
  <Link to="/login" onClick={handleLogout}>
    LOGOUT
  </Link>
  
  <Link to="/profile" className="profile-icon">
    <FaUserCircle size={28} />
  </Link>
</nav>
    </header>
  );
}

export default Header;