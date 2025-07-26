import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Hire A Lawyer!", "/hiring"],
];

export default function Navbar() {
  return (
    <nav className="w-full h-15 px-6 py-3 bg-[#0F1117] text-[#E5E7EB] shadow-md border-b border-[#2C2F36] flex items-center justify-between">
      <div className="text-xl font-bold text-[#E5E7EB]">Juri-Scan</div>
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map(([item, route]) => (
            <NavigationMenuItem key={item}>
              <NavigationMenuLink asChild>
                <Link
                  to={route}
                  className="text-sm font-semibold px-4 py-2 transition-colors text-[#E5E7EB] hover:text-[#4F46E5]"
                >
                  {item}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
