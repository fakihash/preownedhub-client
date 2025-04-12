import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Implement your search logic or pass the query up
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement your search submission logic
  };

  return (
    <header className="bg-gray-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* Top Heading */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-indigo-700 tracking-tight uppercase">
            Buy & Sell Preowned Goods
          </h1>
        </div>

        {/* Navigation and Search */}
        <div className="flex items-center justify-between">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-gray-700 hover:text-indigo-600 font-semibold"
            >
              Home
            </a>
            <span className="border-l border-gray-300 h-5"></span>
            <a
              href="/categories"
              className="text-gray-700 hover:text-indigo-600 font-semibold"
            >
              Categories
            </a>
            <span className="border-l border-gray-300 h-5"></span>
            <a
              href="/products"
              className="text-gray-700 hover:text-indigo-600 font-semibold"
            >
              Products
            </a>
          </nav>

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/buy-sell-logo.png"
              alt="Buy and Sell Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-grow md:ml-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-700"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
              >
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Mobile Navigation Button (Visible on smaller screens) */}
          <div className="md:hidden">
            <button className="text-gray-700 focus:outline-none">
              {/* Hamburger Icon */}
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* Implement your mobile menu here */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
