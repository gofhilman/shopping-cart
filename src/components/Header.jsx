import { MobileNav, DesktopNav } from "./HeaderNav";
import { ShoppingCart } from "lucide-react";

export default function Header({ cartLength }) {
  return (
    <div>
      <h1>ShopShop</h1>
      <DesktopNav />
      <div>
        <ShoppingCart />
        <p>{cartLength}</p>
      </div>
      <MobileNav />
    </div>
  );
}
