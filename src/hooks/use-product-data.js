import extractCategories from "@/lib/extract-categories";
import getProducts from "@/services/get-products";
import { useEffect, useRef, useState } from "react";

export default function useProductData() {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const didFetch = useRef(false);
  const categoryNames = products && extractCategories(products);

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

  useEffect(() => {
    if (categoryNames && !categories) {
      setCategories(categoryNames);
    }
  }, [categoryNames, categories]);

  return { products, categoryNames, categories, setCategories };
}
