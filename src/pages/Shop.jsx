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
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function Shop() {
  const { products } = useOutletContext();
  const categoryNames = [];
  for (const item of products) {
    if (!categoryNames.includes(item.category))
      categoryNames.push(item.category);
  }
  const [categories, setCategories] = useState(categoryNames);
  const handleCheckbox = (name) => {
    if (categories.includes(name)) {
      setCategories(categories.filter((item) => item !== name));
    } else {
      setCategories(categories.concat(name));
    }
  };

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
            {categoryNames.map((name, index) => (
              <div key={index}>
                <Input
                  type="checkbox"
                  id={index}
                  checked={categories.includes(name)}
                  onChange={() => handleCheckbox(name)}
                ></Input>
                <Label htmlFor={index}>
                  {name[0].toUpperCase() + name.slice(1)}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
        <div></div>
      </div>
    </div>
  );
}
