import formatRupiah from "@/lib/format-rupiah";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function CartCard({ product, cart, setCart }) {
  const handleRemoveProduct = () => {
    setCart(cart.filter((item) => item.id !== product.id));
  };
  const handleIncreaseQty = () => {
    setCart(
      cart.map((item) => {
        if (item.id === product.id) item.quantity++;
        return item;
      }),
    );
  };
  const handleDecreaseQty = () => {
    setCart(
      cart
        .map((item) => {
          if (item.id === product.id) item.quantity--;
          return item;
        })
        .filter((item) => item.quantity !== 0),
    );
  };

  return (
    <div className="flex flex-col py-5 lg:flex-row lg:gap-x-5">
      <Link
        className="lg:flex-1"
        to={"/product/" + encodeURIComponent(product.title + "-" + product.id)}
      >
        <div className="grid grid-cols-[80px_auto] gap-x-3 font-medium">
          <img
            src={product.image}
            alt="Product image"
            className="row-[1/3] aspect-4/5 rounded-lg border-2 border-orange-300 object-contain object-center p-2"
          />
          <p className="leading-4.5 self-end">{product.title}</p>
          <p className="text-orange-400">{formatRupiah(product.price)}</p>
        </div>
      </Link>
      <div className="flex items-center self-end lg:flex-col lg:self-stretch lg:justify-between">
        <Trash2
          color="white"
          size={36}
          onClick={handleRemoveProduct}
          className="mr-8 rounded-lg bg-red-600 p-2 lg:self-end lg:mr-0"
        />
        <div className="grid grid-cols-3 items-center text-center">
          <Button
            onClick={handleDecreaseQty}
            className="rounded-r-none font-black"
          >
            -
          </Button>
          <p className="border-t-2 border-b-2 border-neutral-300 py-1 font-medium">
            {product.quantity}
          </p>
          <Button
            className="rounded-l-none font-black"
            onClick={handleIncreaseQty}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
