import React, { useState } from "react";
import { Sidebar, SharedHeader } from "../../components";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex h-screen w-full">
      {/* Sidebar - Hidden on small, visible on md+ */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white shadow-lg h-full">
            <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <SharedHeader onToggleSidebar={() => setIsSidebarOpen(true)} />
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
