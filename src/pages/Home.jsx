import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
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
      </article>
    </div>
  );
}
