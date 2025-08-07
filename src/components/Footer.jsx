import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
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
    <div className="bg-neutral-950 px-12 pt-8 pb-4 text-white">
      <Card className="gap-3 bg-neutral-800 text-white">
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
            className="bg-white text-black"
          />
          <Button>Subscribe</Button>
        </CardFooter>
      </Card>
      <article className="my-5 text-center flex flex-col gap-y-2">
        <div>
          <h1 className="text-xl font-bold">ShopShop</h1>
          <p className="text-base text-neutral-100">Your one‑stop shop for the best products at great prices.</p>
        </div>
        <div className="flex justify-between text-sm">
          {footerInfo.map((info, index) => (
            <div key={index}>
              <h2 className="font-bold py-1">{info.header}</h2>
              <ul className="text-neutral-100 ">
                {info.list.map((list, index) => (
                  <li key={index}>
                    <Link>{list}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>
      <Separator />
      <p className="text-center text-sm py-0.5">&copy; 2025 ShopShop. All right reserved.</p>
    </div>
  );
}
