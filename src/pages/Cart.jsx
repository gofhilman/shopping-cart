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
    <article className="flex flex-col pb-7">
      <h2 className="text-xl font-bold text-orange-300">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-lg">Your cart is empty.</p>
          <Button className="text-lg lg:self-start lg:px-15">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-x-20">
          <div className="divide-y">
            {cart.map((product) => (
              <CartCard
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
          <Card className="lg:self-start">
            <CardHeader>
              <CardHeader>
                <CardTitle className="text-xl">Order summary</CardTitle>
              </CardHeader>
              <CardContent className="text-lg/9">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{formatRupiah(totalPrice)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>{formatRupiah(totalPrice)}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button className="w-full bg-linear-to-br from-orange-300 to-amber-400 text-lg">
                  Proceed to checkout
                </Button>
              </CardFooter>
            </CardHeader>
          </Card>
        </div>
      )}
    </article>
  );
}
