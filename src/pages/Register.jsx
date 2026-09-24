import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImage: null,
    phone: "",
    role: "user",
  });

 const handleChange = (e) => {
  const { name, value, files } = e.target;

  // Profile image
  if (name === "profileImage") {
    setFormData({
      ...formData,
      profileImage: files[0],
    });
    return;
  }

  // First name and last name - only letters and spaces
  if (name === "firstName" || name === "lastName") {
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    return;
  }

  // Phone - only numbers
  if (name === "phone") {
    if (/^[0-9]*$/.test(value)) {
      setFormData({
        ...formData,
        phone: value,
      });
    }
    return;
  }

  // Other fields
  setFormData({
    ...formData,
    [name]: value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  // First name validation
  if (formData.firstName.trim().length < 3) {
    alert("First name must be at least 3 characters");
    return;
  }

  // Last name validation
  if (formData.lastName.trim().length < 1) {
    alert("Last name is required");
    return;
  }

  // Password validation
  if (formData.password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  // Phone validation
  if (!/^[0-9]{10}$/.test(formData.phone)) {
    alert("Phone number must be exactly 10 digits");
    return;
  }

  try {
    const data = new FormData();

    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    data.append("role", formData.role);

    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    const response = await api.post(
      "/api/auth/register",
      data
    );

    alert(response.data.message || "Registration successful");

    navigate("/login");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Registration failed"
    );
  }
};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <h2 className="text-center mb-4">
            Create Account
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
         <input 
  type="email" 
  name="email" 
  className="form-control" 
  value={formData.email} 
  onChange={(e) => {
    setFormData({
      ...formData,
      email: e.target.value
    });
  }} 
  placeholder="Enter email" 
  required 
/>
            </div>

           <div className="mb-3">
            <label>Password</label>

        <div className="position-relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

            <div className="mb-3">
              <label>Profile Image</label>
              <input
                type="file"
                name="profileImage"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Phone Number</label>
             <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                inputMode="numeric"
                maxLength={10}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Register
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Register;