import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api";

function AddProduct() {

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [submitted, setSubmitted] = useState(false);

  // Get existing product when editing
  useEffect(() => {

    if (isEdit) {
      getProduct();
    }

  }, [id]);

  const getProduct = async () => {

    try {

      const response = await api.get(`/api/products/${id}`);

      const data = response.data.product || response.data;

      setProduct({
        name: data.name || "",
        price: data.price || "",
        category: data.category || "",
        description: data.description || "",
        image: null,
      });

    } catch (error) {

      console.error("Get product error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to load product"
      );

    }
  };

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitted(true);

    if (
      !product.name.trim() ||
      !product.price ||
      !product.category ||
      !product.description.trim()
    ) {

      alert("Please fill all fields");
      return;

    }

    if (product.name.trim().length < 3) {

      alert("Product name must contain at least 3 characters");
      return;

    }

    try {

      const formData = new FormData();

      formData.append("name", product.name.trim());
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append(
        "description",
        product.description.trim()
      );

      // Add image only if a new image is selected
      if (product.image) {
        formData.append("image", product.image);
      }

      if (isEdit) {

        // UPDATE PRODUCT

        const response = await api.put(
          `/api/products/update/${id}`,
          formData
        );

        console.log("Product updated:", response.data);

        alert("Product updated successfully");

      } else {

        // ADD PRODUCT

        const response = await api.post(
          "/api/products/add",
          formData
        );

        console.log("Product added:", response.data);

        alert("Product added successfully");

      }

      navigate("/product-view");

    } catch (error) {

      console.error("Product error:", error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <div className="container mt-4">

      <h2>
        {isEdit ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit}>

        {/* Product Name */}
        <div className="mb-3">

          <label className="form-label">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />

          {submitted && !product.name.trim() && (
            <small className="text-danger">
              Product name is required
            </small>
          )}

        </div>

        {/* Price */}
        <div className="mb-3">

          <label className="form-label">
            Price
          </label>

          <input
            type="number"
            name="price"
            className="form-control"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
          />

        </div>

        {/* Category */}
        <div className="mb-3">

          <label className="form-label">
            Category
          </label>

          <select
            name="category"
            className="form-control"
            value={product.category}
            onChange={handleChange}
          >

            <option value="">
              Select Category
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Clothing">
              Clothing
            </option>

            <option value="Shoes">
              Shoes
            </option>

            <option value="Books">
              Books
            </option>

            <option value="Accessories">
              Accessories
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        {/* Description */}
        <div className="mb-3">

          <label className="form-label">
            Description
          </label>

          <textarea
            name="description"
            className="form-control"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
          />

        </div>

        {/* Image */}
        <div className="mb-3">

          <label className="form-label">
            Product Image
          </label>

          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary"
        >

          {isEdit ? "Update Product" : "Add Product"}

        </button>

      </form>

    </div>

  );
}

export default AddProduct;