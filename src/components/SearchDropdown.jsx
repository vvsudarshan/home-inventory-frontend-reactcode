import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SearchDropdown = ({ label, apiEndpoint, value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch options from API
  useEffect(() => {
    axios
      .get(apiEndpoint)
      .then((response) => {
        setOptions(response.data);
        setFilteredOptions(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [apiEndpoint]);

  // Update selectedOption when `value` changes
  // useEffect(() => {
  //   if (value) {
  //     const selected = options.find((opt) => opt.id === value);
  //     setSelectedOption(selected || null);
  //   }
  // }, [value, options]);

  useEffect(() => {
    debugger;
    if (value) {
      const selected = options.find((opt) => opt.id === value);
      setSelectedOption(selected || null);
    }
  }, [value, options]);


  // Handle search input change
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOptions(
      options.filter((option) => option.name.toLowerCase().includes(term))
    );
  };

  // Handle option selection
  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option.id);
    setIsOpen(false);
    setSearchTerm(""); // Reset search
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {/* Dropdown Trigger */}
        <div
          className="border border-gray-300 rounded-md p-2 cursor-pointer bg-white flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption ? selectedOption.name : "Select a category"}</span>
          <span className="ml-2">▼</span>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
            {/* Search Input */}
            <input
              type="text"
              className="w-full p-2 border-b border-gray-300 focus:outline-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />

            {/* Options List */}
            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(option)}
                  >
                    {option.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No categories found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
