import { Link } from "react-router-dom";
import { MobileNav, DesktopNav } from "./HeaderNav";
import { ShoppingCart } from "lucide-react";

export default function Header({ itemQuantity, products }) {
  return (
    <div className="fixed z-10 flex w-full items-center gap-2 border-b-1 bg-white px-3 lg:px-20 pt-4 pb-3 shadow-[0px_5px_5px_-5px_rgba(0,0,0,0.75)]">
      <h1 className="mr-auto text-2xl font-bold">
        <Link to="/">
          <span className="text-orange-300">Shop</span>
          <span className="text-amber-400">Shop</span>
        </Link>
      </h1>
      <DesktopNav products={products} />
      <div>
        <Link to="cart" className="relative">
          <ShoppingCart className="mr-4" fill="black" />
          <div className="absolute -top-2.5 right-0.5 inline-flex size-5 items-center justify-center rounded-full bg-red-600 text-sm text-white">
            <p>{itemQuantity}</p>
          </div>
        </Link>
      </div>
      <MobileNav products={products} />
    </div>
  );
}
