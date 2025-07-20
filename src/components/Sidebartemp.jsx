import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Home, Box, AlertTriangle, Settings } from "lucide-react";

export default function Sidebartemp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`bg-white shadow-lg p-4 ${isSidebarOpen ? "w-64" : "w-20"} transition-all h-screen`}>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mb-4">
        <Menu />
      </button>
      <nav className="space-y-4">
        <Link to="/homemanagemet/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <Home />
          <span className={isSidebarOpen ? "block" : "hidden"}>Dashboard</span>
        </Link>

        <Link to="/homemanagemet/showinventory" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <Box />
          <span className={isSidebarOpen ? "block" : "hidden"}>Inventory</span>
        </Link>

        <Link to="/homemanagemet/low-stock" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <AlertTriangle />
          <span className={isSidebarOpen ? "block" : "hidden"}>Low Stock</span>
        </Link>

        <Link to="/homemanagemet/user-setting" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <Settings />
          <span className={isSidebarOpen ? "block" : "hidden"}>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
