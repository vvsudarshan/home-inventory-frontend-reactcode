// src/components/InputField.jsx
const InputField = ({ label, type, value, onChange }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  };
  
  export default InputField;
  