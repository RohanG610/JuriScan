import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/custom/loginModal";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

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
              <Link to="/hiring" className="text-sm">
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 transition-colors hover:text-primary focus:text-primary text-black dark:text-white"
                  )}
                >
                  Hire A Lawyer!
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {!isLoggedIn ? (
                <button
                  className={cn(
                    "px-4 py-2 text-sm transition-colors bg-primary text-white rounded-md hover:bg-primary/90"
                  )}
                  onClick={() => setIsModalOpen(true)}
                >
                  Login
                </button>
              ) : (
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
