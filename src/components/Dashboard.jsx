import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const sampleData = [
  { name: "Kitchen", items: 30 },
  { name: "Living Room", items: 15 },
  { name: "Bedroom", items: 20 },
  { name: "Bathroom", items: 10 },
];

export default function Dashboard() {
  return (
    <>
      {/* Dashboard Content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Total Items</h2>
          <p className="text-2xl font-bold">75</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Low Stock Items</h2>
          <p className="text-2xl font-bold text-red-500">5</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Inventory Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sampleData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="items" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
