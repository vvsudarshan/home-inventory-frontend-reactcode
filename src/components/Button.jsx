// src/components/Button.jsx
const Button = ({ text, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="w-48 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 text-sm rounded-md"
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  