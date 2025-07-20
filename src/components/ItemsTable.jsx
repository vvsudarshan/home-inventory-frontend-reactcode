import React, { useEffect, useState } from "react";
import SearchFilter from "./SearchFilter";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Import Font Awesome Icons
import { useNavigate } from "react-router-dom";
const ItemsTable = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // Store searched & filtered items
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("-1"); // Default: Show All
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  // Function to fetch items based on category
  const fetchItems = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/items/by-category?category=${categoryId}`
      );
      const data = await response.json();
      debugger;
      setItems(data);
      setFilteredItems(data); // Initially set filtered items to all fetched items
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all items on initial render
  useEffect(() => {
    fetchItems("-1"); // Default: fetch all items
  }, []);

  // Handle category selection
  const handleFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchItems(categoryId);
  };

  // Handle search filtering
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems(items); // Reset to all items if search is empty
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredItems(
        items.filter(
          (item) =>
            item.itemName.toLowerCase().includes(lowerSearch) ||
            item.categoryName.toLowerCase().includes(lowerSearch) ||
            item.description.toLowerCase().includes(lowerSearch) ||
            item.purchaseDate.toLowerCase().includes(lowerSearch) ||
            item.price.toString().includes(searchTerm) ||
            item.quantity.toString().includes(searchTerm)
        )
      );
    }
  }, [searchTerm, items]);

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/items/${itemId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setItems(items.filter((item) => item.id !== itemId));
          setFilteredItems(filteredItems.filter((item) => item.id !== itemId));
          alert("Item deleted successfully.");
        } else {
          alert("Failed to delete the item.");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("An error occurred while deleting the item.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search & Filter Component */}
      <SearchFilter onCategorySelect={handleFilter} onSearch={setSearchTerm} />

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-8 bg-gray-300 animate-pulse rounded"
            ></div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-lg bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Category</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Purchase Date</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2 text-center">
                      {item.categoryName}
                    </td>
                    <td className="border p-2 text-center">{item.itemname}</td>
                    <td className="border p-2 text-center">${item.price}</td>
                    <td className="border p-2 text-center">{item.quantity}</td>
                    <td className="border p-2 text-center">
                      {item.purchaseDate}
                    </td>
                    <td className="border p-2 text-center">
                      {item.description}
                    </td>
                    <td className="border p-2 text-center">
                      <div className="flex justify-center gap-4 text-lg">
                        <FaEdit
                          className="text-blue-500 cursor-pointer hover:text-blue-700"
                          onClick={() => navigate(`/homeinventorymanagement/items-edit/${item.id}`)}
                        />
                        <FaEye
                          className="text-green-500 cursor-pointer hover:text-green-700"
                          onClick={() => navigate(`/homeinventorymanagement/items-view/${item.id}`)}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemsTable;
