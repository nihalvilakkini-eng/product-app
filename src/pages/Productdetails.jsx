import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await api.get(`/api/products/${id}`);

            console.log("PRODUCT RESPONSE:", response.data);

            setProduct(response.data.product);

        } catch (error) {
            console.log("Product details error:", error);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    fetchProduct();
}, [id]);

    if (loading) {
        return <h2 className="text-center mt-5">Loading...</h2>;
    }

    if (!product) {
        return <h2 className="text-center mt-5">Product not found</h2>;
    }

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Product Details
            </h2>

            <div
                className="card shadow p-4 mx-auto"
                style={{ maxWidth: "700px" }}
            >

                {product.image && (
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${product.image.replaceAll("\\", "/")}`}
                        alt={product.name}
                        className="img-fluid rounded mb-4"
                        style={{
                            width: "100%",
                            height: "350px",
                            objectFit: "contain"
                        }}
                    />
                )}

                <h1 className="mb-3">
                    {product.name}
                </h1>

                <h3 className="text-success mb-3">
                    ₹{product.price}
                </h3>

                <p>
                    <strong>Category:</strong> {product.category}
                </p>

                <p>
                    <strong>Description:</strong>
                </p>

                <p>
                    {product.description}
                </p>
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => alert("Purchase selected")}
                >
                    Purchase
                </button>
            </div>

        </div>
    );
}

export default ProductDetails;