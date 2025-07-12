import { useState, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/custom/navbar";
import LoginModal from "@/components/custom/loginModal";
import googleLogo from "../assets/google_logo.svg"

const descCardData = [
  {
    number: 1,
    title: "Summarize and Analyze your Document",
    desc: "Summarize and Analyze your legal documents by using State-of-the-Art AI models",
  },
  {
    number: 2,
    title: "Manage Your Cases and Court Hearings",
    desc: "Use AI and feed your court cases and hearings via document or text,To get best outcome.",
  },
  {
    number: 3,
    title: "Hire a Certified Lawyer quickly and easily",
    desc: "Confused about what to do next? Hire a professional lawyer at a reasonable price",
  },
];

const LandingPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handlegoogleOAuth = () => {
    window.location.href = "http://localhost:5000/auth/google";
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[65vh] bg-gradient-to-br from-slate-100 to-white flex flex-col md:flex-row items-center justify-between px-6 md:px-10 text-center md:text-left">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Manage your Legal <br className="hidden md:block" />
            Documents, Cases, Lawyers <br className="hidden md:block" />
            With AI
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 max-w-xl">
            Upload contracts, terms &amp; conditions, or agreements — and let AI summarize, analyze, and flag critical clauses instantly.
          </p>
          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="text-base md:text-lg px-6 py-3 border-1 shadow-md border-[#8E918F] border-r-1"
                onClick={() => setIsModalOpen(true)}
              >
                Login / Sign Up
              </Button>

              <Button
                className="text-base md:text-lg px-6 py-3 shadow-md bg-[#131314] border-1 border-[#8E918F]"
                onClick={() => handlegoogleOAuth()}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  className="h-[18px] w-[18px]" // as per Google guidelines
                />
                <p className="text-base md:text-lg">Continue with Google</p>
              </Button>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-[40%] h-[60vw] md:h-[25vw] bg-amber-100 border-2 border-amber-300 rounded-xl shadow-md"></div>
      </main>


      <section>
        <div className="flex flex-col items-center justify-center px-4 py-10 min-h-[45vh] bg-gray-100">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
            What you can do?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 w-full max-w-6xl min-h-[30vh] px-2 sm:px-4">
            {descCardData.map(({ number, title, desc }) => (
              <Card
                key={number}
                className="group rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center justify-center text-center py-8 px-4 sm:px-6 min-h-[260px] transition-colors duration-300">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-4 group-hover:text-blue-600">
                    {number}
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-blue-600">
                    {title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 group-hover:text-blue-600">
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} JuriScan. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#services" className="hover:underline">
              Services
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default LandingPage;
