import Header from "../components/Header";
import Sidebartemp from "./../components/Sidebartemp";
import ItemForm from "../components/Itemform";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CreateItem({mode}) {
    const { id } = useParams();
    const [existingItem, setExistingItem] = useState(null);

    useEffect(() => {   
        if(mode=='view'|| mode=='edit' || id){
            axios.get(`http://localhost:8080/api/items/${id}`)
            .then((res) => setExistingItem(res))
            .catch((e)=>alert("Failed to fetch item:", err));
        }
    },[id, mode]);
    const navigator = (path) => {
        window.location.href=path;
    }
    const addItem = async (item) => {
        debugger;
        
        try {
            debugger;
            const response = await axios.post("http://localhost:8080/api/items", item, {
                headers: { "Content-Type": "application/json" },
            });
    
            console.log("Item added successfully:", response.data);
            alert("Item added successfully!");
            navigator('/homemanagemet/showinventory');
        } catch (error) {
            console.error("Error adding item:", error.response?.data || error.message);
            alert("Failed to add item.");
        }
    };

    const  updateItem = async (item)=>{
        debugger;
        try{
            const response = await axios.put(`http://localhost:8080/api/items/${id}`,item,
                {headers : {"content-type" : "application/json"}})
                
                console.log("Item updated successfully:", response.data);
                alert("Item updated successfully!");
                navigator('/homemanagemet/showinventory');
                
        }
        catch(error){
            console.error("Error updating item:", error.response?.data || error.message);
            alert("Failed to update item.");
        }   
        
    }
    
    const isReady = mode === "create" || (existingItem !== null);



    return (
        <>
            <div className="flex flex-col h-screen bg-gray-100">
                <Header /> {/* ✅ Header Component */}
                
                <div className="flex flex-1">
                <Sidebartemp />
                    <div className="flex-1 p-6">
                    {isReady ? (
                        <ItemForm
                        addItem={mode === "create" ? addItem : updateItem}
                        existingItem={existingItem}
                        mode={mode}
                        />
                    ) : (
                        <p>Loading item details...</p>
                    )}
                    </div>
                     {/* ✅ Sidebar Component on the right */}
                </div>
            </div>
        </>
    );
}
