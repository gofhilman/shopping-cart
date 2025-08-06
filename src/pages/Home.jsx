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
import { Link, useOutletContext } from "react-router-dom";

export default function Home() {
  const { products } = useOutletContext();
  const featuredProducts = [products[0], products[1], products[2]];
  const categoryNames = extractCategories(products);

  return (
    <div className="px-12">
      <Card className="bg-linear-to-br from-orange-300 to-amber-400">
        <div>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Bring your wishlist to life
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Explore the latest trends and shop your favorite products now.
            </p>
          </CardContent>
          <CardFooter className="mt-4">
            <Button>
              <Link to="shop">Shop now</Link>
            </Button>
          </CardFooter>
        </div>
        <img src="/shopshop.png" alt="ShopShop cover image" className="px-6" />
      </Card>
      <article className="my-4">
        <h2 className="py-5 text-center text-2xl font-bold">
          Featured Products
        </h2>
        <div>
          {featuredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </article>
      <article className="my-4">
        <h2 className="py-5 text-center text-2xl font-bold">
          Shop by Category
        </h2>
        <div>
          {categoryNames.map((name, index) => (
            <div key={index}>
              <Button>{name[0].toUpperCase() + name.slice(1)}</Button>
            </div>
          ))}
        </div>
      </article>
      <Card>
        <h2>Get 20% off for your first order</h2>
        <Button>Start shopping</Button>
      </Card>
    </div>
  );
}
