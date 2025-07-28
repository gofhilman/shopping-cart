import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

function MobileNav() {}

function DesktopNav() {
  return (
    <div className="flex h-5 items-center space-x-4">
      <Link to="/">Home</Link>
      <Separator orientation="vertical" />
      <Link to="shop">Shop</Link>
    </div>
  );
}

export { MobileNav, DesktopNav };
