import { useState, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/custom/navbar";
import LoginModal from "@/components/custom/loginModal";

const descCardData = [
  {
    number: 1,
    title: "Summarize your Document",
    desc: "Summarize your legal documents by using State-of-the-Art Ai models",
  },
  {
    number: 2,
    title: "Analyze your Documents",
    desc: "Analyze your documents to find vague language, clause",
  },
  {
    number: 3,
    title: "Hire a Lawyer",
    desc: "Confused about what to do next? Hire a lawyer at a reasonable price",
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

  // const handleLoginSuccess = () => {
  // setIsModalOpen(false);
  // navigate("/dashboard"); // ✅ guarantees navigation
  // };

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-gradient-to-br from-slate-100 to-white flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          Juri-Scan
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
          Upload contracts, terms &amp; conditions, or agreements — and let AI summarize, analyze, and flag critical clauses instantly.
        </p>
        {!isLoggedIn && (
          <Button
            className="text-lg px-6 py-3 rounded-2xl shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            Login / Sign Up
          </Button>
        )}
      </main>

      <section>
        <div className="flex flex-col items-center justify-center p-4 min-h-[45vh] bg-gray-100">
          <h1 className="text-3xl font-bold mb-8 text-center">What we can do?</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 w-full max-w-5xl min-h-[30vh]">
            {descCardData.map(({ number, title, desc }) => (
              <Card
                key={number}
                className="group rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center justify-center text-center py-10 px-6 min-h-[280px] transition-colors duration-300">
                  <div className="text-3xl font-extrabold text-gray-700 mb-4 group-hover:text-blue-600">
                    {number}
                  </div>
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                    {title}
                  </h2>
                  <p className="text-gray-500 group-hover:text-blue-600">{desc}</p>
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
