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
    <article className="flex flex-col gap-y-5 pb-7">
      <img
        src={product.image}
        alt="Product image"
        className="rounded-lg border-2 border-orange-300 object-contain object-center p-3"
      />
      <div className="flex flex-col gap-y-2">
        <h2 className="text-lg/6 font-bold">{product.title}</h2>
        <p className="text-lg font-bold text-orange-400">
          {formatRupiah(product.price)}
        </p>
        <p className="text-sm font-medium text-neutral-700">
          Category: {product.category}
        </p>
        <p className="leading-5.5">{product.description}</p>
        <div className="flex flex-col items-stretch gap-y-3 px-22">
          <div className="grid grid-cols-3 items-center">
            <Button
              onClick={() => {
                if (productQty > 0) setProductQty(productQty - 1);
              }}
              className="rounded-r-none text-lg font-black"
            >
              -
            </Button>
            <Input
              type="number"
              value={productQty}
              onChange={(event) => setProductQty(event.target.value)}
              min="0"
              step="1"
              className="rounded-none"
            />
            <Button
              onClick={() => setProductQty(productQty + 1)}
              className="rounded-l-none text-lg font-black"
            >
              +
            </Button>
          </div>
          <Button onClick={handleAddToCart} className="text-lg">
            {productQty === 0 ? "Update cart" : "Add to cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}
