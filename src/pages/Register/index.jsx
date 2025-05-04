import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToast } from "../../utils/toastService";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      address: Yup.string()
        .min(5, "Address must be at least 5 characters")
        .required("Address is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/register",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response, "response register");
        if (response?.status === 201) {
          showToast.success("Account created successfully!");
          navigate("/login");
          formik.resetForm();
        }
      } catch (error) {
        console.error(error);
        showToast.error(
          error.response?.data?.message || "Registration failed. Try again!"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-10 bg-blue-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-gray-800 mb-6 text-center">
          Create Account
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-blue-gray-700 mb-1"
            >
              First Name
            </label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              size="lg"
              label="Enter first name"
              className=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.firstName}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-blue-gray-700 mb-1"
            >
              Last Name
            </label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              size="lg"
              label="Enter last name"
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.lastName}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-blue-gray-700 mb-1"
            >
              Email Address
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
              htmlFor="phone"
              className="block text-sm font-semibold text-blue-gray-700 mb-1"
            >
              Phone
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              size="lg"
              label="Enter your phone"
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-blue-gray-700 mb-1"
            >
              Address
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              size="lg"
              label="Enter your address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.address}
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
            {formik.isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-sm font-medium text-blue-gray-700 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
