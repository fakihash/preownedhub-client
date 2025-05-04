import React from "react";
import { Typography, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <Typography variant="h5" className="text-white mb-2">
            PreOwnedHub
          </Typography>
          <Typography variant="small" className="text-blue-gray-200">
            Discover quality products that bring joy and value to your life.
          </Typography>
        </div>

        {/* Quick Links */}
        <div>
          <Typography variant="h6" className="text-white mb-3">
            Quick Links
          </Typography>
          <ul className="space-y-2">
            <li>
              <Link to={"/"} className="text-blue-gray-200 hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link
                to={"/about"}
                className="text-blue-gray-200 hover:text-white"
              >
                About
              </Link>
            </li>
            {/* <li>
              <Link
                to={"/contactus"}
                className="text-blue-gray-200 hover:text-white"
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-blue-gray-700 pt-6 text-center">
        <Typography variant="small" className="text-blue-gray-400">
          &copy; {new Date().getFullYear()} PreOwnedHub. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
