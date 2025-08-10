import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import SearchBar from "./SearchBar";

function MobileNav({ products }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <DynamicIcon
        name={dialogOpen ? "x" : "menu"}
        onClick={() => setDialogOpen(!dialogOpen)}
        className="lg:hidden"
      ></DynamicIcon>
      {dialogOpen && (
        <div className="absolute inset-x-0 top-full flex flex-col items-end border-b-1 bg-white pr-6 pb-2 pl-15 shadow-[0px_5px_5px_-5px_rgba(0,0,0,0.75)]">
          <NavigationMenu orientation="vertical" className="flex-col text-base">
            <MenuItems setDialogOpen={setDialogOpen} />
          </NavigationMenu>
          <SearchBar
            products={products}
            setDialogOpen={setDialogOpen}
            className="my-2 px-0.5 text-right"
          />
        </div>
      )}
    </>
  );
}

function DesktopNav({ products }) {
  return (
    <div className="hidden gap-x-6 px-6 lg:flex">
      <NavigationMenu>
        <MenuItems />
      </NavigationMenu>
      <SearchBar products={products} />
    </div>
  );
}

function MenuItems({ setDialogOpen = () => {} }) {
  return (
    <>
      <NavigationMenuItem onClick={() => setDialogOpen(false)}>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link to="/">Home</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem onClick={() => setDialogOpen(false)}>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link to="shop">Shop</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
}

export { MobileNav, DesktopNav };
