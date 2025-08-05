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
    <div>
      <div>
        <Link
          to={
            "/product/" + encodeURIComponent(product.title + "-" + product.id)
          }
        >
          <img src={product.image} alt="Product image" />
          <p>{product.title}</p>
          <p>{formatRupiah(product.price)}</p>
        </Link>
      </div>
      <div>
        <Trash2 color="red" onClick={handleRemoveProduct} />
        <div>
          <Button onClick={handleDecreaseQty}>-</Button>
          <p>{product.quantity}</p>
          <Button onClick={handleIncreaseQty}>+</Button>
        </div>
      </div>
    </div>
  );
}
