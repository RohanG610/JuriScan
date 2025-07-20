import { useState, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/custom/navbar";
import LoginModal from "@/components/custom/loginModal";
import googleLogo from "../assets/google_logo.svg";
import hero_img from "@/assets/hero_img.jpeg"

const descCardData = [
  {
    number: 1,
    title: "Summarize and Analyze your Document",
    desc: "Summarize and Analyze your legal documents by using State-of-the-Art AI models",
  },
  {
    number: 2,
    title: "Manage Your Cases and Court Hearings",
    desc: "Use AI and feed your court cases and hearings via document or text, To get best outcome.",
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
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[65vh] bg-[#0F1117] text-[#E5E7EB] flex flex-col md:flex-row items-center justify-between px-6 md:px-10 text-center md:text-left">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Manage your Legal <br className="hidden md:block" />
            Documents, Cases, Lawyers <br className="hidden md:block" />
            With AI
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-[#9CA3AF] mb-8 max-w-xl">
            Upload contracts, terms &amp; conditions, or agreements — and let AI summarize, analyze, and flag critical clauses instantly.
          </p>
          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="text-base md:text-lg px-6 py-3 bg-[#2563EB] hover:bg-[#1E40AF] text-white shadow-md"
                onClick={() => setIsModalOpen(true)}
              >
                Login / Sign Up
              </Button>

              <Button
                className="text-base md:text-lg px-6 py-3 shadow-md bg-[#1A1C22] text-[#E5E7EB] border border-[#2C2F36] hover:text-[#2563EB]"
                onClick={handlegoogleOAuth}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  className="h-[18px] w-[18px] mr-2"
                />
                <p>Continue with Google</p>
              </Button>
            </div>
          )}
        </div>

        <div className="w-full md:w-[40%] h-[60vw] md:h-[25vw] bg-[#1A1C22] border border-[#2C2F36] rounded-xl shadow-md">
          <img className="rounded-xl" src={hero_img} alt="" />
        </div>
      </main>

      <section className="bg-[#1A1C22] text-[#E5E7EB]">
        <div className="flex flex-col items-center justify-center px-4 py-10 min-h-[45vh]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
            What you can do?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 w-full max-w-6xl px-2 sm:px-4">
            {descCardData.map(({ number, title, desc }) => (
              <Card
                key={number}
                className="group bg-[#0F1117] border border-[#2C2F36] rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center justify-center text-center py-8 px-4 sm:px-6 min-h-[260px] transition-colors duration-300">
                  <div className="text-2xl sm:text-3xl font-extrabold mb-4 text-[#E5E7EB] group-hover:text-[#2563EB]">
                    {number}
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold mb-2 text-[#E5E7EB] group-hover:text-[#2563EB]">
                    {title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#9CA3AF] group-hover:text-[#2563EB]">
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0F1117] text-[#9CA3AF] py-6 px-4 border-t border-[#2C2F36]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} JuriScan. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-[#4F46E5]">
              About
            </a>
            <a href="#services" className="hover:text-[#4F46E5]">
              Services
            </a>
            <a href="#contact" className="hover:text-[#4F46E5]">
              Contact
            </a>
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default LandingPage;
