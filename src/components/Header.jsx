import { MobileNav, DesktopNav } from "./HeaderNav";
import { ShoppingCart } from "lucide-react";

export default function Header({ itemQuantity }) {
  return (
    <div>
      <h1>ShopShop</h1>
      <DesktopNav />
      <div>
        <ShoppingCart />
        <p>{itemQuantity}</p>
      </div>
      <MobileNav />
    </div>
  );
}
