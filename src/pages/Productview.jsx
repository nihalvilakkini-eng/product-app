import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";

function Productview() {

    const navigate = useNavigate();
const handleDelete = async (id) => {
  try {
    await api.put(`/api/products/delete/${id}`);

    alert("Product deleted successfully");

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );
  } catch (error) {
    console.log(error);
    alert("Failed to delete product");
  }
};
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {

            const response = await api.get("/api/products");

            console.log("Products from backend:", response.data);

            setProducts(response.data.products || response.data);

        } catch (error) {

            console.log("Error fetching products:", error);

        }
    };

    return (
        <div className="container mt-4">

            <h2>View Products</h2>

            <div className="row">

                {products.length === 0 ? (

                    <p>No products found</p>

                ) : (

                    products.map((product) => (

                        <div
                            className="col-md-4 mb-4"
                            key={product._id}
                        >

                            <div
                                className="card shadow h-100"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    navigate(`/product/${product._id}`)
                                }
                            >

                              {product.image && (
    <img
        src={`${import.meta.env.VITE_BACKEND_URL}/${product.image.replaceAll("\\", "/")}`}
        className="card-img-top"
        alt={product.name}
        style={{
            height: "250px",
            objectFit: "contain"
        }}
    />
)}

                                <div className="card-body">

                                    <h5>{product.name}</h5>

                                    <h6>₹{product.price}</h6>

                                    <p>{product.category}</p>

                                    <p>{product.description}</p>

                                    <button
                                        className="btn btn-warning"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            navigate(
                                                `/edit-product/${product._id}`
                                            );

                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(product._id)}
                                        >
                                        Delete
                                     </button>                
                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default Productview;