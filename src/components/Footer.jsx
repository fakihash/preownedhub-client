import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Section 1: About Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              About Us
            </h3>
            <p className="text-sm text-gray-500">
              Your company description goes here. Tell your visitors about your
              mission, values, and team.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Quick Links
            </h3>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>
                <a href="/privacy" className="hover:text-gray-700">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-700">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-700">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/sitemap" className="hover:text-gray-700">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Contact Us
            </h3>
            <p className="text-sm text-gray-500">
              123 Main Street, Suite 456 Lahore, Punjab, Pakistan
            </p>
            <p className="text-sm text-gray-500">Email: info@example.com</p>
            <p className="text-sm text-gray-500">Phone: +92 (XXX) XXX-XXXX</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {currentYear} Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
