import { useNavigate , Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../Api";

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
      alert("Login successful");

      navigate("/")
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Login failed"
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
                  placeholder="Enter your email"
                  {...register("email")}
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

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  {...register("password")}
                />

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
  <h6 className="mb-0">Don't have an account?</h6>

  <Link to="/register">
    {/* <button type="button" className="mybtn"> */}
      Create Account
    {/* </button> */}
  </Link>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;