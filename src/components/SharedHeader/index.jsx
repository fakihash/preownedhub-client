import React from "react";
import { Menu } from "lucide-react";

const SharedHeader = ({ onToggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="md:hidden">
        <Menu
          className="h-6 w-6 text-gray-700 cursor-pointer"
          onClick={onToggleSidebar}
        />
      </div>
      <h1 className="text-lg font-semibold text-indigo-600">Admin Panel</h1>
    </header>
  );
};

export default SharedHeader;
