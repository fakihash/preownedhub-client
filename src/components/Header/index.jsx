import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Input, IconButton } from "@material-tailwind/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          PreOwned<span className="text-gray-800">Hub</span>
        </div>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex flex-1 mx-6">
          <Input
            icon={<Search className="h-5 w-5 text-gray-500" />}
            label="Search products"
            className="w-full"
            crossOrigin={undefined}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link className="text-gray-700 hover:text-indigo-600">Browse</Link>
          <Link className="text-gray-700 hover:text-indigo-600">Sell</Link>
          <Link className="text-gray-700 hover:text-indigo-600">Contact</Link>

          <Link
            to={"/login"}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <IconButton
            variant="text"
            size="md"
            onClick={() => setIsOpen(!isOpen)}
            className="text-indigo-600"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </IconButton>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3">
          <div className="mt-2">
            <Input
              icon={<Search className="h-5 w-5 text-gray-500" />}
              label="Search products"
              crossOrigin={undefined}
            />
          </div>
          <Link to="/" className="block text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link className="block text-gray-700 hover:text-indigo-600">
            Browse
          </Link>
          <Link className="block text-gray-700 hover:text-indigo-600">
            Sell
          </Link>
          <Link className="block text-gray-700 hover:text-indigo-600">
            Contact
          </Link>
          <Button className="w-full bg-blue-gray-900 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Login
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
