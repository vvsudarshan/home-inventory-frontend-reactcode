import React from "react";

const DropdownMenu = ({ children }) => {
  return (
    <div className="absolute w-full border border-gray-300 bg-white shadow-lg mt-1 rounded-lg z-10">
      {children}
    </div>
  );
};

export default DropdownMenu;
