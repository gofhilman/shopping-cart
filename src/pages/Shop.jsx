import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useOutletContext } from "react-router-dom";

export default function Shop() {
  const { products } = useOutletContext();
  const categories = [];
  for (const item of products) {
    if (!categories.includes(item.category)) categories.push(item.category);
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardContent>
            {categories.map((category, index) => (
              <div key={index}>
                <Input type="checkbox" id={index}></Input>
                <Label htmlFor={index}>
                  {category[0].toUpperCase() + category.slice(1)}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
