import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/Home";
import GalleryPage from "./pages/Gallery";
import ProtectedRoute from "./Routes/ProtectedRoutes"; // Import from new location
import AdminLoginPage from "./pages/admin/AdminLoginPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />

          {/* GALLERY ROUTES */}
          <Route
            path="/editorial"
            element={<GalleryPage />}
          />
          <Route
            path="/fashion"
            element={<GalleryPage />}
          />
          <Route
            path="/portrait"
            element={<GalleryPage  />}
          />
          <Route
            path="/architecture"
            element={<GalleryPage />}
          />
          <Route
            path="/documentary"
            element={<GalleryPage  />}
          />
          <Route
            path="/wedding"
            element={<GalleryPage />}
          />

          {/* ... Add all other gallery routes here ... */}

          {/* ADMIN LOGIN PAGE (Public) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* PROTECTED ADMIN ROUTE */}
          {/* The entire /admin path is handled by the ProtectedRoute component. */}
          <Route path="/admin/*" element={<ProtectedRoute />} />

          {/* Optional: 404 Catch-All */}
          <Route
            path="*"
            element={
              <div className="text-center pt-40 h-screen text-4xl">
                404 | Not Found
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
