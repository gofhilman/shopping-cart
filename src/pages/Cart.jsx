import CartCard from "@/components/CartCard";
import { useOutletContext } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useOutletContext();

  return (
    <article>
      <h2>Your Shopping Cart</h2>
      <div>
        <div>
          {cart.map((product) => (
            <CartCard
              key={product.id}
              product={product}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
        <div></div>
      </div>
    </article>
  );
}
