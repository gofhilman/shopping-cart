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
    <Card>
      <CardContent>
        <Link
          to={
            "/product/" + encodeURIComponent(product.title + "-" + product.id)
          }
        >
          <img src={product.image} alt="Product image" />
          <h3>{product.title}</h3>
          <p>{formatRupiah(product.price)}</p>
        </Link>
      </CardContent>
      <CardFooter>
        {productQty ? (
          <div>
            <Button onClick={handleDecreaseQty}>-</Button>
            <p>{productQty}</p>
            <Button onClick={handleIncreaseQty}>+</Button>
          </div>
        ) : (
          <Button onClick={handleAddToCart}>Add to cart</Button>
        )}
      </CardFooter>
    </Card>
  );
}
