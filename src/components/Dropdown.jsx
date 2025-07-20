import React, { useState } from "react";

const Dropdown = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-64">
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        <div
          className="border border-gray-300 rounded-lg p-2 cursor-pointer bg-white flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {children(isOpen, setIsOpen)}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;