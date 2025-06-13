import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { Card, CardContent } from "@/components/ui/card";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const descCardData = [
  {number:1, title: "Summarize your Document", desc:"Summarize your legal documents by using State-of-the-Art Ai models"},
  {number:2, title: "Analyze your Documents", desc:"Analyze your documents to find vauge language, clause"},
  {number:3, title: "Hire a Lawyer", desc:"Confuse to what to do next, hire a lawyer at reasonable price"}
]

const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
    <nav className="w-full p-4 bg-white dark:bg-zinc-900 shadow-md flex items-center justify-between">
      <div className="text-xl font-bold text-black dark:text-white">Juri-Scan</div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className="text-sm">
              <NavigationMenuLink
                className={cn(
                  "px-4 py-2 transition-colors hover:text-primary focus:text-primary text-black dark:text-white"
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about" className="text-sm">
              <NavigationMenuLink
                className={cn(
                  "px-4 py-2 transition-colors hover:text-primary focus:text-primary text-black dark:text-white"
                )}
              >
                About Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/login" className="text-sm">
              <NavigationMenuLink
                className={cn(
                  "px-4 py-2 transition-colors bg-primary text-white rounded-md hover:bg-primary/90"
                )}
              >
                Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
    <main className="min-h-[60vh] bg-gradient-to-br from-slate-100 to-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
        Juri-Scan
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        Upload contracts, terms &amp; conditions, or agreements — and let AI summarize, analyze, and flag critical clauses instantly.
      </p>
      <Button
        className="text-lg px-6 py-3 rounded-2xl shadow-md"
        onClick={() => navigate("/home")}
      >
        Get Started
      </Button>
    </main>
    <div className="flex flex-col items-center justify-center p-4 min-h-[45vh] bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-center">What we can do?</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 w-full max-w-5xl min-h-[30vh]">
          {descCardData.map(({number, title, desc})=>(
            <Card key={number} className="rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <CardContent className="flex flex-col items-center justify-center text-center py-10 px-6 min-h-[280px]">
                <div
                  className="text-3xl font-extrabold text-gray-700 mb-4 transition-colors duration-300 hover:text-blue-600"
                >
                  {number}
                </div>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-500">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
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
};

export default LandingPage;
