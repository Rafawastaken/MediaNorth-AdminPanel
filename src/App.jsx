// src/App.jsx
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import {AuthProvider, ProtectedRoute} from './contexts/AuthContext.jsx';
import {Toaster} from 'react-hot-toast';
import AddSitePage from './pages/AddSitePage.jsx';

const App = () => (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right"/>
        <Routes>
          <Route
              element={
                <ProtectedRoute>
                  <Layout/>
                </ProtectedRoute>
              }
          >
            <Route path="/" element={<HomePage/>}/>
            <Route path="/locais/novo" element={<AddSitePage/>}/>
          </Route>

          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
);

export default App;
