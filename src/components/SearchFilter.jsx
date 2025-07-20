import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchFilter({ onCategorySelect, onSearch }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("-1");
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const navigate  = useNavigate();
  
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories/all");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId); // Pass selected category to parent
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass search term to parent
  };

  // Handle Add Item Button Click
  const handleAddItem = () =>{
    alert("Add Item Clicked");
    navigate("/homemanagemet/inv-createItem")
  }

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2">
        {/* Show All Button */}
        <button
          onClick={() => handleCategoryChange("-1")}
          className={`px-3 py-1 text-sm rounded h-8 ${
            selectedCategory === "-1" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show All
        </button>

        {/* Dynamically Render Category Buttons */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-3 py-1 text-sm rounded h-8 ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}

        {/* Search Input with Icon */}
        <div className="relative w-48">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full h-8 pl-8 pr-2 text-sm border rounded focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* Add Item Button */}
        <button
          onClick={handleAddItem}
          className="px-3 py-1 text-sm bg-green-500 text-white rounded h-8 flex items-center justify-center"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;
