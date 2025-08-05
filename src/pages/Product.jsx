import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import formatRupiah from "@/lib/format-rupiah";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function Product() {
  const { cart, setCart, products } = useOutletContext();
  const { productURI } = useParams();
  const productId = productURI.split("-")[productURI.split("-").length - 1];
  const product = products.find((item) => item.id === +productId);
  const [productQty, setProductQty] = useState(
    cart.find((item) => item.id === product.id)?.quantity ?? 0,
  );

  const handleAddToCart = () => {
    if (productQty < 0 || !Number.isInteger(productQty)) {
      alert("Only non-negative whole number is allowed.");
    } else if (cart.find((item) => item.id === product.id)) {
      setCart(
        cart
          .map((item) => {
            if (item.id === product.id) item.quantity = productQty;
            return item;
          })
          .filter((item) => item.quantity !== 0),
      );
    } else if (productQty > 0) {
      const updatedCart = cart.concat(product);
      updatedCart.find((item) => item.id === product.id).quantity = productQty;
      setCart(updatedCart);
    }
  };

  return (
    <article>
      <img src={product.image} alt="Product image" />
      <div>
        <h2>{product.title}</h2>
        <p>{formatRupiah(product.price)}</p>
        <p>Category: {product.category}</p>
        <p>{product.description}</p>
        <div>
          <div>
            <Button
              onClick={() => {
                if (productQty > 0) setProductQty(productQty - 1);
              }}
            >
              -
            </Button>
            <Input
              type="number"
              value={productQty}
              onChange={(event) => setProductQty(event.target.value)}
              min="0"
              step="1"
            />
            <Button onClick={() => setProductQty(productQty + 1)}>+</Button>
          </div>
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </div>
      </div>
    </article>
  );
}
