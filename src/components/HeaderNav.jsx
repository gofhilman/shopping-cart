import { Link } from "react-router-dom";

function MobileNav() {}

function DesktopNav() {
  return (
    <div className="flex items-center">
      <Link to="/">Home</Link>
      <Link to="shop">Shop</Link>
    </div>
  );
}

export { MobileNav, DesktopNav };
