const DatePicker = ({ label, value, onChange, placeholder }) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm mb-2">{label}</label>
            <input
                type="date"
                className="w-full p-2 border-b border-gray-300 focus:outline-none"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default DatePicker;