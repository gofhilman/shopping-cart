import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import extractCategories from "@/lib/extract-categories";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { products } = useOutletContext();
  const featuredProducts = [products[0], products[1], products[2]];
  const categoryNames = extractCategories(products);

  return (
    <div>
      <Card>
        <div>
          <CardHeader>
            <CardTitle>Bring your wishlist to life</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Explore the latest trends and shop your favorite products now.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Shop now</Button>
          </CardFooter>
        </div>
        <img src="/shopshop.png" alt="ShopShop cover image" />
      </Card>
      <article>
        <h2>Featured Products</h2>
        {featuredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </article>
      <article>
        <h2>Shop by Category</h2>
        {categoryNames.map((name, index) => (
          <div key={index}>
            <Button>{name[0].toUpperCase() + name.slice(1)}</Button>
          </div>
        ))}
      </article>
      <Card>
        <h2>Get 20% off for your first order</h2>
        <Button>Start shopping</Button>
      </Card>
    </div>
  );
}
