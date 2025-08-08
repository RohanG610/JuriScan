import { useState, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/custom/navbar";
import LoginModal from "@/components/custom/loginModal";
import googleLogo from "../assets/google_logo.svg";
import hero_img from "@/assets/hero_img.jpeg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

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

  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 1, // fully visible
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" }
    })
  };
  return (
    <>
      <Navbar />
      <main className="relative min-h-[81vh] text-[#E5E7EB] flex flex-col md:flex-row items-center justify-between px-6 md:px-10 text-center md:text-left overflow-hidden">

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1117] via-[#1A1C22] to-[#0F1117] animate-gradient-slow"></div>

        {/* Subtle document grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Optional scanning beam */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(217,195,163,0.05)] to-transparent animate-scan"></div>

        {/* Left side content */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-center md:items-start mb-10 md:mb-0">
          <h1 className="text-5xl md:text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            Manage your <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#D9C3A3] via-[#BFA36A] to-[#8C7851] bg-clip-text text-transparent">
              Legal Documents
            </span>,{" "}
            <span className="bg-gradient-to-r from-[#D9C3A3] via-[#BFA36A] to-[#8C7851] bg-clip-text text-transparent">
              Cases
            </span>,{" "}
            <span className="bg-gradient-to-r from-[#D9C3A3] via-[#BFA36A] to-[#8C7851] bg-clip-text text-transparent">
              Lawyers
            </span>{" "}
            <br className="hidden md:block" />
            With AI
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-[#9CA3AF] mb-10 max-w-2xl leading-relaxed">
            Upload contracts, terms &amp; conditions, or agreements — and let AI summarize, analyze, and flag critical clauses instantly.
          </p>

          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                className="text-lg md:text-xl px-8 py-4 bg-[#2563EB] hover:bg-[#1E40AF] text-white shadow-lg rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Login / Sign Up
              </Button>
          
              <Button
                className="text-lg md:text-xl px-8 py-4 shadow-lg bg-[#1A1C22] text-[#E5E7EB] border border-[#2C2F36] hover:text-[#2563EB] rounded-lg"
                onClick={handlegoogleOAuth}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  className="h-[20px] w-[20px] mr-3"
                />
                <p>Continue with Google</p>
              </Button>
            </div>
          )}
        </div>
        
        {/* Right side image */}
        <div className="relative z-10 w-full md:w-[42%] h-[60vw] md:h-[25vw] bg-[#1A1C22] border border-[#2C2F36] rounded-2xl shadow-lg">
          <img className="rounded-2xl" src={hero_img} alt="" />
        </div>
      </main>


      <section
      ref={ref}
      className="relative bg-[#1A1C22] text-[#E5E7EB] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#BFA36A10] to-transparent"></div>

      <div className="flex flex-col items-center justify-center px-4 py-10 min-h-[45vh] relative z-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
          What you can do?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 w-full max-w-6xl px-2 sm:px-4">
          {descCardData.map(({ number, title, desc }, i) => (
            <motion.div
              key={number}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
            >
              <Card className="group bg-[#0F1117] border border-[#2C2F36] rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(191,163,106,0.5)]">
                <CardContent className="flex flex-col items-center justify-center text-center py-8 px-4 sm:px-6 min-h-[260px] transition-colors duration-300">
                  <div className="text-2xl sm:text-3xl font-extrabold mb-4 text-[#E5E7EB] group-hover:text-[#BFA36A]">
                    {number}
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold mb-2 text-[#E5E7EB] group-hover:text-[#BFA36A]">
                    {title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#9CA3AF] group-hover:text-[#BFA36A]">
                    {desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
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
