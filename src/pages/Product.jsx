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
  const [clicked, setClicked] = useState(false);

  const handleAddToCart = () => {
    if (+productQty < 0 || !Number.isInteger(+productQty)) {
      alert("Only non-negative whole number is allowed.");
    } else if (cart.find((item) => item.id === product.id)) {
      setCart(
        cart
          .map((item) => {
            if (item.id === product.id) item.quantity = +productQty;
            return item;
          })
          .filter((item) => item.quantity !== 0),
      );
    } else if (+productQty > 0) {
      const updatedCart = cart.concat(product);
      updatedCart.find((item) => item.id === product.id).quantity = +productQty;
      setCart(updatedCart);
    }
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <article className="flex flex-col gap-y-5 pb-7 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-x-20">
      <img
        src={product.image}
        alt="Product image"
        className="rounded-lg border-2 border-orange-300 object-contain object-center p-3"
      />
      <div className="flex flex-col gap-y-2 lg:gap-y-6 lg:py-2">
        <h2 className="text-lg/6 font-bold lg:text-4xl">{product.title}</h2>
        <p className="text-lg font-bold text-orange-400 lg:text-4xl">
          {formatRupiah(product.price)}
        </p>
        <p className="text-sm font-medium text-neutral-700 lg:text-base">
          Category: {product.category}
        </p>
        <p className="leading-5.5 lg:text-lg">{product.description}</p>
        <div className="flex flex-col items-center gap-y-3 px-22 lg:mt-auto lg:flex-row lg:justify-center lg:gap-x-15">
          <div className="grid grid-cols-[repeat(3,60px)] items-center">
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
          <Button
            onClick={handleAddToCart}
            className={`px-12 text-lg transition-transform duration-200 lg:px-15 ${clicked ? "scale-110" : ""}`}
          >
            {productQty === 0 ? "Update cart" : "Add to cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}
