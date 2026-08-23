import { useState } from "react";

function AddProducts({addProduct}) {

    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: ""
    });


    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(product);
        setProduct({
                    name: "",
                    price: "",
                    category: "",
                    description: ""
                });
      
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
                />

                <label><b>Price</b></label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                />

                <label><b>Category</b></label>
                <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
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
                ></textarea>

                <button type="submit">
                    <b>Submit</b>
                </button>

            </form>
        </div>
    );
}

export default AddProducts;