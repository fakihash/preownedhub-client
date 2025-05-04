import { useState } from "react";
import { SquareMenu, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/authSlice";
import HeaderSearch from "../HeaderSearch";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();
  console.log(userData, "user data into site");

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          PreOwned<span className="text-gray-800">Hub</span>
        </div>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:block mx-6">
          <HeaderSearch />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {/* <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to={"/login"} className="text-gray-700 hover:text-indigo-600">
            Sell
          </Link> */}
          {/* <Link
            to={"/contactus"}
            className="text-gray-700 hover:text-indigo-600"
          >
            Contact
          </Link> */}
          {userData?.firstName ? (
            <Menu>
              <MenuHandler>
                <Avatar
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`}
                  alt="user avatar"
                  size="md"
                  className="cursor-pointer"
                />
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/product/add")}>
                  Add Product
                </MenuItem>
                <MenuItem onClick={() => navigate("/product/list")}>
                  View Products
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link
              to={"/login"}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <IconButton
            variant="text"
            size="md"
            onClick={() => setIsOpen(!isOpen)}
            className="text-indigo-600"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <SquareMenu className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3">
          <div className="mt-2">
            <HeaderSearch />
          </div>
          <Link to="/" className="block text-gray-700 hover:text-indigo-600">
            Home
          </Link>

          {/* <Link
            to={"/contactus"}
            className="block text-gray-700 hover:text-indigo-600"
          >
            Contact
          </Link> */}
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-gray-900 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
