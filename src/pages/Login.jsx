import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../Api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Validation
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.data.role);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Invalid email or password. Please check your credentials and try again"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4 w-80">

            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  {...register("email", {
                    onChange: (e) => {
                      let value = e.target.value;

                      if (value.endsWith("@")) {
                        value = value + "gmail.com";
                      }

                      e.target.value = value;
                    },
                  })}
                 />
                {errors.email && (
                  <p className="text-danger">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>

                <div className="position-relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    {...register("password")}
                  />

                  <span
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </span>

                </div>

                {errors.password && (
                  <p className="text-danger">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login button */}
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary w-50"
                >
                  Login
                </button>
              </div>

            </form>

            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
              <h6 className="mb-0">
                Don't have an account?
              </h6>

              <Link to="/register">
                Create Account
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;