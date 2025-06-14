import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage"; // adjust path if needed
import HiringPage from "./pages/HiringPage";
import AboutUsPage from "./pages/AboutPage";
import Dashboard from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path='/about' element={<AboutUsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
