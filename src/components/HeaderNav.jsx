import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

function MobileNav() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <DynamicIcon
        name={dialogOpen ? "x" : "menu"}
        onClick={() => setDialogOpen(!dialogOpen)}
        className="lg:hidden"
      ></DynamicIcon>
      {dialogOpen && (
        <div className="absolute inset-x-0 top-full flex flex-col items-end rounded-b-lg border-b-1 bg-white pr-6 pb-2 pl-15 shadow-[0px_5px_5px_-5px_rgba(0,0,0,0.75)]">
          <NavigationMenu orientation="vertical" className="flex-col">
            <MenuItems />
          </NavigationMenu>
          <Input
            type="search"
            placeholder="Search a product"
            className="my-2 px-0.5 text-right"
          />
        </div>
      )}
    </>
  );
}

function DesktopNav() {
  return (
    <div className="hidden lg:block">
      <NavigationMenu>
        <MenuItems />
      </NavigationMenu>
      <Input type="search" placeholder="Search a product" />
    </div>
  );
}

function MenuItems() {
  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link to="/">Home</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link to="shop">Shop</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
}

export { MobileNav, DesktopNav };
