import React from "react";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="w-full p-2 border-b border-gray-300 focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
