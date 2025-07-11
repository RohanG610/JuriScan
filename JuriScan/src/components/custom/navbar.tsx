import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [['Home',''], ['About Us','about'], ['Hire A Lawyer!','hiring']]

export default function Navbar() {

  return (
    <>
      <nav className="w-full px-6 py-3 bg-white dark:bg-zinc-900 shadow-lg flex items-center justify-between">
        <div className="text-xl font-bold text-black dark:text-white">Juri-Scan</div>
        <NavigationMenu>
          <NavigationMenuList>
            { navItems.map(([item,route])=>(
              <NavigationMenuItem>
              <Link to={`/${route}`} className="text-sm font-semibold">
                <NavigationMenuLink
                  className={cn(
                    " px-4 py-2 transition-colors hover:text-primary focus:text-primary text-black dark:text-white"
                  )}
                  >
                  {item}
                </NavigationMenuLink>
              </Link>
              </NavigationMenuItem>
            ))
            }
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </>
  );
}
