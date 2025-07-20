import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil"; // ✅ Import RecoilRoot
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeInventoryDashboard from "./pages/HomeInventoryDashboard";
import SettingsPage from "./pages/SettingsPage"; // ✅ Ensure this is imported
import PrivateRoute from "./routes/PrivateRoute";
import Inventory from "./pages/Inventory";
import CreateItem  from "./pages/CreateItem";
export default function App() {
  return (
    <RecoilRoot> {/* ✅ Wrap RecoilRoot to enable global state */}
      <BrowserRouter>
        <Routes>
          <Route path="/homemanagemet" element={<Login />} />
          <Route path="/homemanagemet/signup" element={<Signup />} />
          <Route
            path="/homemanagemet/dashboard"
            element={
              <PrivateRoute>
                <HomeInventoryDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/homemanagemet/user-setting"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/homemanagemet/showinventory"
            element={
              <PrivateRoute>
                <Inventory/>
              </PrivateRoute>
            }
          />
          <Route path="/homeinventorymanagement/items-edit/:id" element={<CreateItem mode="edit" />} />
          <Route path="/homeinventorymanagement/items-view/:id" element={<CreateItem mode="view" />} />
          <Route path="/homemanagemet/inv-createItem" element={<CreateItem mode="create" />} />

        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
