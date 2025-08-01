import getProducts from "@/services/get-products";
import { useEffect, useRef, useState } from "react";

export default function useProductData() {
  const [products, setProducts] = useState();
  const didFetch = useRef(false);

  useEffect(() => {
    if (!didFetch.current) {
      didFetch.current = true;
      (async () => {
        try {
          setProducts(await getProducts());
        } catch (error) {
          console.error("Fetch product data failed:", error.message);
        }
      })();
    }
  }, []);
  return products;
}
