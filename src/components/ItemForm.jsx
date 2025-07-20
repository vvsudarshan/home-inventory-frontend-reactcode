import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import SearchDropdown from "./SearchDropdown";
import DatePicker from "./DatePicker";

const ItemForm = ({ addItem, existingItem, mode }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");



  // Update category from dropdown
  useEffect(() => {
    debugger;
    if (existingItem) {
      setItemName(existingItem.data.name);
      setQuantity(existingItem.data.quantity);  

      // setItemName(existingItem.name);
      // setQuantity(existingItem.quantity);
      setCategory(existingItem.data.category.id);
      setPrice(existingItem.data.price);
      setDesc(existingItem.data.description);
      setDate(existingItem.data.purchaseDate);
    }
  }
  , [existingItem]);





  // Update category from dropdown
  const updateDropdown = (value) => {
    debugger;
    setCategory(value);
  };




  // Handle form submission
  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    const newItem = {
      name: itemName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      categoryId: category ? parseInt(category) : 0,
      description: desc,
      purchaseDate: date,
    };

    addItem(newItem);
  };

  const isView = mode === "view";
  //alert(isView);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <InputField
        label="Item Name"
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        disabled={isView}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          disabled={isView}
        />
        <InputField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={isView}
        />
      </div>

      <InputField
        label="Description"
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        disabled={isView}
      />

      <DatePicker
        label="Purchase Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        disabled={isView}
      />

      <SearchDropdown
        label="Category"
        value={category}
        apiEndpoint="http://localhost:8080/api/categories/all"
        onChange={updateDropdown}
        disabled={isView}
      />

      <div className="flex justify-between space-x-4">
        {!isView && (
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {existingItem ? "Update Item" : "Add Item"}
          </button>
        )}
        <button
          type="button"
          className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
