import { Link } from "react-router-dom";
import { MobileNav, DesktopNav } from "./HeaderNav";
import { ShoppingCart } from "lucide-react";

export default function Header({ itemQuantity }) {
  return (
    <div className="fixed flex w-full gap-2 px-2 py-3 bg-white">
      <h1 className="mr-auto">
        <Link to="/">ShopShop</Link>
      </h1>
      <DesktopNav />
      <div>
        <Link to="cart" className="relative">
          <ShoppingCart className="mr-4" />
          <p className="absolute -top-2 right-1 inline">{itemQuantity}</p>
        </Link>
      </div>
      <MobileNav />
    </div>
  );
}
