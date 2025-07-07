// Routes + auth
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./contexts/AuthContext.jsx";
// Layout
import Layout from "./layouts/Layout.jsx";
// Pages
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
// Sites
import AddSitePage from "./pages/sites/AddSitePage.jsx";
import SitePage from "./pages/sites/SitePage.jsx";
import EditSitePage from "./pages/sites/EditSitePage.jsx";
// Devices
import DevicePage from "./pages/devices/DevicePage.jsx";
import AddDevicePage from "./pages/devices/AddDevicePage.jsx";
import EditDevicePage from "./pages/devices/EditDevicePage.jsx";
// Customers
import CustomersPage from "./pages/customers/CustomersPage.jsx";
import AddCustomerPage from "./pages/customers/AddCustomerPage.jsx";
import CustomerPage from "./pages/customers/CustomerPage.jsx";
// Videos
import AddVideoPage from "./pages/videos/AddVideoPage.jsx";

// Other
import { Toaster } from "react-hot-toast";
import EditCustomerPage from "./pages/customers/EditCustomerPage.jsx";
import EditVideoPage from "./pages/videos/EditVideoPage.jsx";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* ---General----------------------- */}
          <Route path="/" element={<HomePage />} />

          {/* ---Sites----------------------- */}
          <Route path="/sites" element={<SitePage />} />
          <Route path="/sites/add" element={<AddSitePage />} />
          <Route path="/site/:idSite/edit" element={<EditSitePage />} />
          {/* ---Devices----------------------- */}
          <Route path="/sites/:idSite/devices" element={<DevicePage />} />
          <Route
            path="/sites/:idSite/devices/add"
            element={<AddDevicePage />}
          />
          <Route
            path="/sites/:idSite/devices/:idDevice/edit"
            element={<EditDevicePage />}
          />
          {/* ---Customers----------------------- */}
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/add" element={<AddCustomerPage />} />
          <Route path="/customers/:idCustomer" element={<CustomerPage />} />
          <Route
            path="/customers/:idCustomer/edit"
            element={<EditCustomerPage />}
          />
          {/* ---Videos----------------------- */}
          <Route
            path="/customers/:idCustomer/videos/add"
            element={<AddVideoPage />}
          />
          <Route
            path="/customers/:idCustomer/videos/:idVideo/edit"
            element={<EditVideoPage />}
          />
        </Route>

        {/* Auth/Public */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
