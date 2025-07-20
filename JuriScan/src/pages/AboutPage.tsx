import Navbar from "@/components/custom/navbar";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <div className="w-full min-h-[25vh] bg-[#1A1C22] border-b border-[#2C2F36] flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-[#4F46E5] p-6">
          About Us
        </h1>
      </div>

      {/* Main Content */}
      <main className="px-6 py-12 bg-[#0F1117] text-[#E5E7EB] flex justify-center">
        <section className="max-w-4xl w-full bg-[#1A1C22] rounded-xl p-8 md:p-12 shadow-md border border-[#2C2F36] animate-fade-in space-y-6 text-lg">
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
          <p className="text-center mt-10 text-[#9CA3AF]">
            <strong>Made with ❤️ for you.</strong>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0F1117] text-[#9CA3AF] py-6 px-4 border-t border-[#2C2F36]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} JuriScan. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="/about" className="hover:text-[#4F46E5] transition-colors">About</a>
            <a href="/services" className="hover:text-[#4F46E5] transition-colors">Services</a>
            <a href="/contact" className="hover:text-[#4F46E5] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Tailwind animation class (optional in globals.css) */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out both;
          }
        `}
      </style>
    </>
  );
}
