
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebartemp";
export default function HomeInventoryDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> {/* ✅ Sidebar Component */}

      <div className="flex-1 p-6">
        <Header /> {/* ✅ Header Component */}
        <Dashboard /> {/* ✅ Dashboard Component */}
      </div>
    </div>
  );
}
