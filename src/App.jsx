// Routes + auth
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./contexts/AuthContext.jsx";
// Layout
import Layout from "./layouts/Layout.jsx";
// Pages
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import AddSitePage from "./pages/sites/AddSitePage.jsx";
import SitePage from "./pages/sites/SitePage.jsx";
import SiteTvPage from "./pages/sites/SiteTvPage.jsx";
import AddTvSitePage from "./pages/sites/AddTvSitePage.jsx";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/locais" element={<SitePage />} />
          <Route path="/locais/novo" element={<AddSitePage />} />
          <Route path="/locais/:idSite/devices" element={<SiteTvPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
