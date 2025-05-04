import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { showToast } from "../../utils/toastService";
import { useDispatch } from "react-redux";
import { login } from "../../services/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/login",
          values
        );
        console.log(response.data);
        if (response.status === 200) {
          showToast.success("Login Successfully!");
          navigate("/");
          dispatch(
            login({
              data: response?.data?.data,
              token: response?.data?.token,
              isLoggedIn: true,
              role: response?.data?.role,
            })
          );
          resetForm();
        }
      } catch (error) {
        console.error("Login failed", error.response?.data?.message);
        showToast.error(
          error.response?.data?.message || "Login failed. Try again!"
        );
        // You can show toast here
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-blue-gray-700 mb-1"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              size="lg"
              label="Enter your email"
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-blue-gray-700 mb-1"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              size="lg"
              label="Enter your password"
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={formik.isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-semibold py-2 rounded-lg shadow-md"
          >
            {formik.isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm font-medium text-blue-gray-700 text-center mt-6">
          Don’t have an account?{" "}
          <Link to={"/register"} className="text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
