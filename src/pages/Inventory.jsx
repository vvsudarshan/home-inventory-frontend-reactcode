import React from "react";
import Sidebar from "../components/Sidebartemp";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import ItemsTable from "../components/ItemsTable";
export default function Inventory() {
  return (
    <>  
      <div className="flex h-screen bg-gray-100">
            <Sidebar /> {/* ✅ Sidebar Component */}
      
            <div className="flex-1 p-6">
              <Header /> {/* ✅ Header Component */}
              {/* <SearchFilter/> */}
              <ItemsTable/>
            </div>
          </div>
    </>
  );
}
