import CartCard from "@/components/CartCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import formatRupiah from "@/lib/format-rupiah";
import { Link, useOutletContext } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useOutletContext();
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  return (
    <article>
      <h2>Your Shopping Cart</h2>
      <div>
        <div>
          {cart.length === 0 ? (
            <div>
              <p>Your cart is empty.</p>
              <Button>
                <Link to="/shop">Continue shopping</Link>
              </Button>
            </div>
          ) : (
            cart.map((product) => (
              <CartCard
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
              />
            ))
          )}
        </div>
        <Card>
          <CardHeader>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p>Subtotal</p>
                <p>{formatRupiah(totalPrice)}</p>
              </div>
              <div>
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <Separator />
              <div>
                <p>Total</p>
                <p>{formatRupiah(totalPrice)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Proceed to checkout</Button>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    </article>
  );
}
