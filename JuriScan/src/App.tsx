import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import HiringPage from "./pages/HiringPage";
import AboutUsPage from "./pages/AboutPage";
import Dashboard from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import ChatRoom from "./pages/ChatRoom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token in localStorage on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
