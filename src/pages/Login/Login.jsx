import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Login = () => {
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);

      // After signIn success, fetch user info from your backend
      const response = await axiosSecure.get(`/users?email=${data.email}`);
      const user = await response?.data;
      console.log(user, 'user login');

      if (user?.status === "blocked") {
        // Show alert if blocked
        Swal.fire({
          icon: "error",
          title: "Account Blocked",
          text: "Your account has been blocked. Please contact support.",
        });
        return; // stop login flow here
      }

      // If not blocked, show success and navigate
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from);
    } catch (error) {
      // Handle sign in or fetch errors
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password",
      });
    }
  };
  // const onSubmit = (data) => {
  //   console.log(data);
  //   signIn(data.email, data.password).then((result) => {
  //     console.log(result.user);
  //     Swal.fire({
  //       position: "top-center",
  //       icon: "success",
  //       title: "User Login Successful",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     navigate(from);
  //   });
  // };
  useEffect(() => {
  setValue("email", "alamin12@gmail.com");
  setValue("password", "developer504");
}, [setValue]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-primaryColor bg-opacity-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl text-center text-[#fe3c47] font-bold mb-6">
          Please Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
             
            >
              Email
            </label>
            <input
              type="email"
              id="email"
             
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#fe3c47] focus:border-[#fe3c47]"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
  
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#fe3c47] focus:border-[#fe3c47]"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#fe3c47] text-white rounded-lg hover:bg-[#e03a38] transition duration-300"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#fe3c47] hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
