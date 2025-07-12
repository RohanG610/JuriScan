import Navbar from "@/components/custom/navbar";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
        <div className="m-0 p-0 min-w-[100%] min-h-[25vh] bg-amber-600">
          <h1 className="text-4xl font-bold mb-6 text-center text-[#6bcec4] justify-self-start p-6">About Us</h1>
        </div>
      <main className="min-h-fit px-6 py-12 bg-white text-gray-800 max-w-4xl mx-auto flex-col justify-center m-5">
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
            <strong>Made with ❤️ for you.</strong>
          </p>
        </section>
      </main>
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
    </>
  );
}
