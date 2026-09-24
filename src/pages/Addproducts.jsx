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
const [errors, setErrors] = useState({});
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

  if (name === "image") {
    setProduct((prev) => ({
      ...prev,
      image: files[0],
    }));
    return;
  }

  // Product name - only letters and spaces
 if (name === "name") {
  if (/^[A-Za-z0-9\s]*$/.test(value)) {
    setProduct((prev) => ({
      ...prev,
      name: value,
    }));

    setErrors((prev) => ({
      ...prev,
      name: "",
    }));
  }
  return;
}
  

  // Price - only numbers
  if (name === "price") {
    if (/^[0-9]*$/.test(value)) {
      setProduct((prev) => ({
        ...prev,
        price: value,
      }));

      setErrors((prev) => ({
        ...prev,
        price: "",
      }));
    }
    return;
  }

  setProduct((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

 if (!product.name.trim()) {
  newErrors.name = "Product name is required";

} else if (product.name.trim().length < 3) {
  newErrors.name =
    "Product name must contain at least 3 characters";

} else if (!/[A-Za-z]/.test(product.name)) {
  newErrors.name =
    "Product name cannot contain only numbers";
}
  if (!product.price) {
    newErrors.price = "Price is required";
  } else if (Number(product.price) <= 0) {
    newErrors.price = "Price must be greater than 0";
  }

  if (!product.category) {
    newErrors.category = "Please select a category";
  }

  if (!product.description.trim()) {
    newErrors.description = "Description is required";
  } else if (product.description.trim().length < 5) {
    newErrors.description =
      "Description must contain at least 5 characters";
  }

  setErrors(newErrors);

  // Stop if errors exist
  if (Object.keys(newErrors).length > 0) {
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

    if (product.image) {
      formData.append("image", product.image);
    }

    if (isEdit) {
      const response = await api.put(
        `/api/products/update/${id}`,
        formData
      );

      console.log("Product updated:", response.data);
      alert("Product updated successfully");
    } else {
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

         {errors.name && (
  <small className="text-danger">
    {errors.name}
  </small>
)}

        </div>

        {/* Price */}
        <div className="mb-3">

          <label className="form-label">
            Price
          </label>

         <input
  type="text"
  name="price"
  className="form-control"
  value={product.price}
  onChange={handleChange}
  placeholder="Enter price"
  inputMode="numeric"
/>

{errors.price && (
  <small className="text-danger">
    {errors.price}
  </small>
)}
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
  <option value="">Select Category</option>
  <option value="Electronics">Electronics</option>
  <option value="Clothing">Clothing</option>
  <option value="Shoes">Shoes</option>
  <option value="Books">Books</option>
  <option value="Accessories">Accessories</option>
  <option value="Other">Other</option>
</select>

{errors.category && (
  <small className="text-danger">
    {errors.category}
  </small>
)}
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

{errors.description && (
  <small className="text-danger">
    {errors.description}
  </small>
)}

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