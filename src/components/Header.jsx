import { MobileNav, DesktopNav } from "./HeaderNav";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <div>
      <h1>ShopShop</h1>
      <DesktopNav />
      <ShoppingCart />
      <MobileNav />
    </div>
  );
}
