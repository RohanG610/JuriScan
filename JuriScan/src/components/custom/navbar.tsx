import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {

  return (
    <>
      <nav className="w-full p-4 bg-white dark:bg-zinc-900 shadow-md flex items-center justify-between">
        <div className="text-xl font-bold text-black dark:text-white">Juri-Scan</div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="text-sm font-bold">
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
              <Link to="/about" className="text-sm font-bold">
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
              <Link to="/hiring" className="text-sm font-bold">
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 transition-colors hover:text-primary focus:text-primary text-black dark:text-white"
                  )}
                >
                  Hire A Lawyer!
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </>
  );
}
