import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-gray-800 mb-6 text-center">
          Create Account
        </h2>
        <form className="space-y-5">
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
              className="!border-blue-gray-200 focus:!border-indigo-600"
            />
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
              className="!border-blue-gray-200 focus:!border-indigo-600"
            />
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
              className="!border-blue-gray-200 focus:!border-indigo-600"
            />
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
              className="!border-blue-gray-200 focus:!border-indigo-600"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-semibold py-2 rounded-lg shadow-md"
          >
            Register
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
