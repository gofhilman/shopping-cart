import formatRupiah from "@/lib/format-rupiah";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { LoadingSpinner } from "./ui/loading-spinner";

export default function ProductCard({ product, className }) {
  const { cart, setCart } = useOutletContext();
  const [loaded, setLoaded] = useState(false);
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
    <Card className={"justify-between gap-y-2 text-center " + className}>
      <CardContent>
        <Link
          to={
            "/product/" + encodeURIComponent(product.title + "-" + product.id)
          }
        >
          <div className="flex aspect-4/5 w-full items-center justify-center rounded-lg border-2 border-orange-300 p-3">
            {!loaded && <LoadingSpinner className="w-20 text-orange-300" />}
            <img
              src={product.image}
              alt="Product image"
              className={
                "aspect-4/5 object-contain object-center " +
                (loaded ? "block" : "hidden")
              }
              onLoad={() => setLoaded(true)}
            />
          </div>
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
            <p className="border-t-2 border-b-2 border-neutral-300 py-0.5 text-lg font-medium">
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
