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
    <div className="lg:flex lg:flex-col">
      <Card className="bg-linear-to-br from-orange-300 to-amber-400 lg:grid lg:grid-cols-[5fr_4fr] lg:px-4 lg:py-7">
        <div className="lg:flex lg:flex-col lg:justify-center lg:gap-y-10">
          <CardHeader>
            <CardTitle className="text-xl font-bold lg:text-5xl">
              Bring your wishlist to life
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="lg:text-2xl">
              Explore the latest trends and shop your favorite products now.
            </p>
          </CardContent>
          <CardFooter className="mt-4">
            <Link to="shop">
              <Button className="cursor-pointer lg:px-8 lg:py-6 lg:text-2xl">
                Shop now
              </Button>
            </Link>
          </CardFooter>
        </div>
        <div className="flex items-center justify-center px-6 lg:pl-30">
          <img
            src="/shopshop.png"
            alt="ShopShop cover image"
            className="rounded-lg"
          />
        </div>
      </Card>
      <article className="my-4 lg:px-40">
        <h2 className="py-5 text-center text-2xl font-bold lg:text-4xl">
          Featured Products
        </h2>
        <Carousel
          plugins={[plugin.current]}
          className="z-0 w-full px-1"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {featuredProducts.map((item) => (
              <CarouselItem key={item.id} className="lg:basis-1/3">
                <ProductCard product={item} className="h-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 size-10" />
          <CarouselNext className="right-0 size-10" />
        </Carousel>
      </article>
      <article className="my-4 lg:px-30">
        <h2 className="py-5 text-center text-2xl font-bold lg:text-4xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-5 lg:gap-15">
          {categoryNames.map((name, index) => (
            <Link to="shop" key={index}>
              <Button
                onClick={() => setCategories([name])}
                className="w-full cursor-pointer lg:py-6 lg:text-lg"
              >
                {name[0].toUpperCase() + name.slice(1)}
              </Button>
            </Link>
          ))}
        </div>
      </article>
      <Card className="my-8 items-start gap-4 bg-neutral-800 px-6 text-white lg:self-center lg:px-20">
        <h2 className="text-xl font-bold">Get 20% off for your first order</h2>
        <Link to="shop">
          <Button className="cursor-pointer bg-white text-black hover:bg-neutral-50">
            Start shopping
          </Button>
        </Link>
      </Card>
    </div>
  );
}
