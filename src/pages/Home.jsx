import { useEffect, useState } from "react";
import api from "../Api";

function Home() {
  const [products, setProducts] = useState([]);

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
      <div className="container">

        <h1 className="homehead d-flex justify-content-center align-items-center">
          Find Products You Love
        </h1>

        <p className="description d-flex justify-content-center align-items-center">
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
                    src={`http://localhost:8000/${product.image.replaceAll("\\", "/")}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">
                    {product.name}
                  </h5>

                  <p className="card-text">
                    {product.description}
                  </p>

                  <h6>₹{product.price}</h6>

                  <button className="btn btn-primary">
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