import formatRupiah from "@/lib/format-rupiah";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "./ui/button";

export default function ProductCard({ product }) {
  const { cart, setCart } = useOutletContext();
  const productQty = cart.find((item) => item.id === product.id)?.quantity ?? 0;
  const handleAddToCart = () => {
    const updatedCart = cart.concat(product);
    updatedCart.find((item) => item.id === product.id).quantity = 1;
    setCart(updatedCart);
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
    <Card className="gap-y-2 text-center">
      <CardContent>
        <Link
          to={
            "/product/" + encodeURIComponent(product.title + "-" + product.id)
          }
        >
          <img
            src={product.image}
            alt="Product image"
            className="aspect-4/5 rounded-lg border-2 border-orange-300 object-contain object-center p-3"
          />
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-lg font-bold text-orange-400">
            {formatRupiah(product.price)}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="justify-center">
        {productQty ? (
          <div className="grid grid-cols-3 items-center">
            <Button
              className="rounded-r-none text-lg font-black"
              onClick={handleDecreaseQty}
            >
              -
            </Button>
            <p className="border-t-2 border-b-2 border-black py-0.5 text-lg font-medium">
              {productQty}
            </p>
            <Button
              className="rounded-l-none text-lg font-black"
              onClick={handleIncreaseQty}
            >
              +
            </Button>
          </div>
        ) : (
          <Button className="text-lg" onClick={handleAddToCart}>
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
