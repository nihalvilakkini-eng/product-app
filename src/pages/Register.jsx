import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";

function Register() {
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

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("FORM DATA:", formData);

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
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
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
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
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