import React, { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isItemsSearch,setIsItemsSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/homemanagemet");
  };

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
      <h1 className="text-xl font-semibold">Home</h1>
      <div className="flex items-center space-x-4">
      {isItemsSearch && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search items..."
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2 text-gray-500" />
        </div>

      )
      
      }
        
        {/* User Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <User />
            <span>{user || "User"}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
