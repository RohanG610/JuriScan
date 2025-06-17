import Navbar from "@/components/custom/navbar";
import React from "react";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-12 bg-white text-gray-800 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">About JuriScan</h1>
        <section className="space-y-6 text-lg">
          <p>
            <strong>JuriScan</strong> is an AI-powered legal assistant platform designed to make legal document review fast, smart, and accessible. Whether you are a lawyer, a client, or someone reviewing terms and contracts, JuriScan helps you summarize, analyze, and understand critical legal information with ease.
          </p>
          <p>
            Our mission is to empower legal professionals and individuals with tools that simplify complex legal processes. With cutting-edge AI models and smart clause detection, JuriScan highlights vague language, critical clauses, and potential risks in any uploaded document.
          </p>
          <p>
            JuriScan also connects clients with verified lawyers by offering a streamlined hiring interface where users can filter legal experts based on rates, specialization, availability, and language preferences.
          </p>
          <p>
            We are committed to building transparency and trust in legal tech, aiming to assist with everything from quick contract reviews to in-depth document analysis.
          </p>
          <p className="text-center mt-10">
            <strong>Made with ❤️ by legal tech enthusiasts.</strong>
          </p>
        </section>
      </main>
    </>
  );
}
