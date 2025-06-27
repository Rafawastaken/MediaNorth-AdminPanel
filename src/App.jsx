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
// Devices
import SiteDevicePage from "./pages/devices/SiteDevicePage.jsx";
import AddDeviceSitePage from "./pages/devices/AddDeviceSitePage.jsx";
import EditDevicePage from "./pages/devices/EditDevicePage.jsx";
// Customers
import AddCustomerPage from "./pages/customers/AddCustomerPage.jsx";

// Other
import { Toaster } from "react-hot-toast";

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
          {/* Standard */}
          <Route path="/" element={<HomePage />} />

          {/* Sites */}
          <Route path="/sites" element={<SitePage />} />
          <Route path="/sites/add" element={<AddSitePage />} />
          <Route path="/sites/:idSite/devices" element={<SiteDevicePage />} />
          <Route
            path="/sites/:idSite/devices/add"
            element={<AddDeviceSitePage />}
          />
          <Route
            path="/sites/:idSite/devices/:idDevice/edit"
            element={<EditDevicePage />}
          />
          <Route path="/customers/add" element={<AddCustomerPage />} />
        </Route>

        {/* Auth/Public */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
