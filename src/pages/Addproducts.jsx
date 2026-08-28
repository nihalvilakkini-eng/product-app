import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function AddProduct({ addProduct, products, updateProduct }) {
  const { id } = useParams();

    const navigate = useNavigate();

    const isEdit = id !== undefined;

 const [product, setProduct] = useState(
    isEdit
        ? products[id]
        : {
            name: "",
            price: "",
            category: "",
            description: ""
        }
);
 const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

const handleSubmit = (e) => {
    e.preventDefault();

    if (
        product.name.trim() === "" ||
        product.price === "" ||
        product.category === "" ||
        product.description.trim() === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    if (isEdit) {
        updateProduct(Number(id), product);
        navigate("/product-view");
    } else {
        addProduct(product);

        setProduct({
            name: "",
            price: "",
            category: "",
            description: ""
        });
    }
};
    return (
        <div className="add-product">
            <h1>Add Product</h1>

            <form onSubmit={handleSubmit}>

                <label><b>Product Name</b></label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                     minLength="3"
                    required
                />

                <label><b>Price</b></label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                />

                <label><b>Select Your Category</b></label>
                <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                >
                      <option value="vehicle">Category</option>
                    <option value="vehicle">Vehicles</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Shoes">Shoes</option>
                </select>

                <label><b>Description</b></label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    maxLength={200}
                    required
                ></textarea>

                <button type="submit">
                    <b>Submit</b>
                </button>

            </form>
        </div>
    );
}

export default AddProduct;