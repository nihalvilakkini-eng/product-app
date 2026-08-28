import { useNavigate } from "react-router-dom";

function Productview({ products }) {

    const navigate = useNavigate();

    return (
        <div className="container mt-4">

            <h2>View Products</h2>

            <div className="row">

                {products.map((product, index) => (

                    <div className="col-md-4 mb-4" key={index}>

                        <div
                            className="card shadow h-100"
                            onClick={() => navigate(`/product/${index}`)}
                            style={{ cursor: "pointer" }}
                        >

                            <div className="card-body">

                                <h5>{product.name}</h5>

                                <h6>₹{product.price}</h6>

                                <p>{product.category}</p>

                                <p>{product.description}</p>

                                <button
                                    className="btn btn-warning d-flex justify-content-center align-items-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/edit-product/${index}`);
                                    }}
                                >
                                    Edit
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Productview;