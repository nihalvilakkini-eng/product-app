import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";


function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/api/products");

        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <main>
      <div className="container home-container">

        <h1 className="hero-section homehead d-flex justify-content-center align-items-center">
          Find Products You Love
        </h1>

        <p className="hero-section description d-flex justify-content-center align-items-center">
          Quality products at great prices.
        </p>

        <button
          type="button"
          className="shopnow d-flex justify-content-center align-items-center"
        >
          <b>Shop Now</b>
        </button>

        <h2 className="features mt-5 mb-5">
          Featured Products
        </h2>

        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product._id}>

              <div className="card">

                {product.image && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${product.image.replaceAll("\\", "/")}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                )}

                <div className="card product-card">

                  <h5 className="products-title">
                    {product.name}
                  </h5>

                  <p className="card-text">
                    {product.description}
                  </p>

                  <h6 className="product-price">₹{product.price}</h6>

                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="view-product-btn"
                  >
                    View Details
                  </button>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}

export default Home;