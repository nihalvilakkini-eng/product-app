import { useParams } from "react-router-dom";

function ProductDetails({ products }) {

    const { id } = useParams();

    const product = products[id];

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className="container mt-5">
        <h2 className="mt-3 mb-3">product details</h2>
            <div className="card shadow p-4 w-50">

                <h1>{product.name}</h1>

                <h3 className="text-success">
                    ₹{product.price}
                </h3>

                <p>
                    <strong>Category:</strong> {product.category}
                </p>

                <p>
                    <strong>Description:</strong>
                </p>

                <p>{product.description}</p>

            </div>

        </div>
    );
}

export default ProductDetails;