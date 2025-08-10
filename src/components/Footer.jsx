import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Footer() {
  const footerInfo = [
    {
      header: "Company",
      list: ["About", "Careers", "Press"],
    },
    {
      header: "Support",
      list: ["Contact", "FAQs", "Shipping"],
    },
    {
      header: "Legal",
      list: ["Privacy Policy", "Terms of Service"],
    },
  ];

  return (
    <div className="bg-neutral-950 px-12 lg:px-30 pt-8 pb-4 text-white lg:flex lg:flex-col">
      <Card className="gap-3 bg-neutral-800 text-white lg:self-center lg:px-10">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Join our newsletter & get 20% off
          </CardTitle>
        </CardHeader>
        <CardContent className="text-neutral-100">
          <p>
            Be the first to know about new arrivals, sales & exclusive offers.
          </p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white text-black lg:max-w-80"
          />
          <Button>Subscribe</Button>
        </CardFooter>
      </Card>
      <article className="my-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-2 text-center">
        <div className="lg:text-left">
          <h1 className="text-xl lg:text-2xl font-bold">ShopShop</h1>
          <p className="text-base lg:text-lg text-neutral-100">
            Your one‑stop shop for the best products at great prices.
          </p>
        </div>
        <div className="flex justify-between text-sm lg:text-lg lg:gap-x-25">
          {footerInfo.map((info, index) => (
            <div key={index}>
              <h2 className="py-1 font-bold">{info.header}</h2>
              <ul className="text-neutral-100">
                {info.list.map((list, index) => (
                  <li key={index}>{list}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>
      <Separator />
      <p className="py-0.5 lg:pt-2 text-center text-sm lg:text-base">
        &copy; 2025 ShopShop. All right reserved.
      </p>
    </div>
  );
}
