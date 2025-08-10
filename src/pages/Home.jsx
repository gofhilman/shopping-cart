import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const { products, categoryNames, setCategories } = useOutletContext();
  const featuredProducts = [];
  products.forEach((item, index) => {
    if (index % 3 === 0) featuredProducts.push(item);
  });
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div>
      <Card className="bg-linear-to-br from-orange-300 to-amber-400 lg:grid lg:grid-cols-[5fr_4fr] lg:py-7 lg:px-4">
        <div className="lg:flex lg:flex-col lg:justify-center lg:gap-y-10">
          <CardHeader>
            <CardTitle className="text-xl lg:text-5xl font-bold">
              Bring your wishlist to life
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="lg:text-2xl">
              Explore the latest trends and shop your favorite products now.
            </p>
          </CardContent>
          <CardFooter className="mt-4">
            <Button className="lg:text-2xl lg:py-6 lg:px-8">
              <Link to="shop">Shop now</Link>
            </Button>
          </CardFooter>
        </div>
        <div className="flex justify-center items-center px-6 lg:pl-30">
          <img
            src="/shopshop.png"
            alt="ShopShop cover image"
            className="rounded-lg"
          />
        </div>
      </Card>
      <article className="my-4">
        <h2 className="py-5 text-center text-2xl font-bold">
          Featured Products
        </h2>
        {/* <div className="flex flex-col items-center justify-center gap-5">
          {featuredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div> */}
        <Carousel
          plugins={[plugin.current]}
          className="z-0 w-full max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {featuredProducts.map((item) => (
              <CarouselItem key={item.id}>
                <ProductCard product={item} className="h-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 size-10" />
          <CarouselNext className="right-0 size-10" />
        </Carousel>
      </article>
      <article className="my-4">
        <h2 className="py-5 text-center text-2xl font-bold">
          Shop by Category
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-5">
          {categoryNames.map((name, index) => (
            <Button key={index} onClick={() => setCategories([name])}>
              <Link to="shop">{name[0].toUpperCase() + name.slice(1)}</Link>
            </Button>
          ))}
        </div>
      </article>
      <Card className="my-8 items-start gap-4 bg-neutral-800 px-6 text-white">
        <h2 className="text-xl font-bold">Get 20% off for your first order</h2>
        <Button>
          <Link to="shop">Start shopping</Link>
        </Button>
      </Card>
    </div>
  );
}
