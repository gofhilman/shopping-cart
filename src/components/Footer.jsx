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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Join our newsletter & get 20% off</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Be the first to know about new arrivals, sales & exclusive offers.
          </p>
        </CardContent>
        <CardFooter>
          <Input type="email" />
          <Button>Subscribe</Button>
        </CardFooter>
      </Card>
      <article>
        <div>
          <h1>ShopShop</h1>
          <p>Your one‑stop shop for the best products at great prices.</p>
        </div>
        <div>
          {footerInfo.map((info) => (
            <div>
              <h2>{info.header}</h2>
              <ul>
                {info.list.map((list) => (
                  <li>
                    <Link>{list}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>
      <Separator />
      <p>&copy; 2025 ShopShop. All right reserved.</p>
    </div>
  );
}
