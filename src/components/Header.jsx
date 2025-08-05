import { Link } from "react-router-dom";
import { MobileNav, DesktopNav } from "./HeaderNav";
import { ShoppingCart } from "lucide-react";

export default function Header({ itemQuantity }) {
  return (
    <div>
      <h1>ShopShop</h1>
      <DesktopNav />
      <div>
        <Link to="cart">
          <ShoppingCart />
          <p>{itemQuantity}</p>
        </Link>
      </div>
      <MobileNav />
    </div>
  );
}
