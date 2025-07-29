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
        <div>
          <div>
            <NavigationMenu
              orientation="vertical"
              className="[&[data-orientation=vertical]]:flex-col"
            >
              <MenuItems />
            </NavigationMenu>
            <Input type="search" placeholder="Search a product" />
          </div>
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
