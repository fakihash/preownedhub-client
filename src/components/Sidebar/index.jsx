import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import {
  LayoutDashboard,
  Users,
  Box,
  BarChart2,
  LogOut,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/authSlice";

const menuItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: "/admin/dashboard",
  },
  {
    label: "Users Listing",
    icon: <Users className="h-5 w-5" />,
    path: "/admin/users",
  },
  {
    label: "Products",
    icon: <Box className="h-5 w-5" />,
    path: "/admin/products",
  },
  {
    label: "Reports",
    icon: <BarChart2 className="h-5 w-5" />,
    path: "/admin/reports",
  },
];

function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (path) => {
    navigate(path);
    closeSidebar?.(); // Close mobile sidebar if exists
  };

  return (
    <Card className="w-64 h-full p-4 shadow-xl shadow-blue-gray-900/5">
      {/* Close button for mobile */}
      {closeSidebar && (
        <div className="flex justify-end mb-4 md:hidden">
          <X className="h-6 w-6 cursor-pointer" onClick={closeSidebar} />
        </div>
      )}

      <div className="mb-6 text-center">
        <div className="text-2xl font-bold text-indigo-600">
          PreOwned<span className="text-gray-800">Hub</span>
        </div>
      </div>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => handleNavigate(item.path)}
            className="cursor-pointer"
          >
            <ListItemPrefix>{item.icon}</ListItemPrefix>
            {item.label}
          </ListItem>
        ))}
        <ListItem
          className="mt-auto cursor-pointer"
          onClick={() => {
            dispatch(logout());
            navigate("/admin/login");
          }}
        >
          <ListItemPrefix>
            <LogOut className="h-5 w-5 text-red-500" />
          </ListItemPrefix>
          <span className="text-red-500">Logout</span>
        </ListItem>
      </List>
    </Card>
  );
}

export default Sidebar;
