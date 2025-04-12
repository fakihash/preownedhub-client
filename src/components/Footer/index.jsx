import React from "react";
import { Typography, IconButton } from "@material-tailwind/react";
import { Facebook } from "lucide-react";

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
              <a href="#" className="text-blue-gray-200 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-gray-200 hover:text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-gray-200 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-gray-200 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <Typography variant="h6" className="text-white mb-3">
            Help
          </Typography>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-gray-200 hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-gray-200 hover:text-white">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-gray-200 hover:text-white">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-gray-200 hover:text-white">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        {/* <div>
          <Typography variant="h6" className="text-white mb-3">
            Follow Us
          </Typography>
          <div className="flex gap-3">
            <IconButton color="black">
              <Facebook />
            </IconButton>
            <IconButton variant="text" color="white">
              <i className="fab fa-twitter" />
            </IconButton>
            <IconButton variant="text" color="white">
              <i className="fab fa-instagram" />
            </IconButton>
            <IconButton variant="text" color="white">
              <i className="fab fa-linkedin-in" />
            </IconButton>
          </div>
        </div> */}
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
