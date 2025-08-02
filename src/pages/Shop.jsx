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
import extractCategories from "@/lib/extract-categories";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const DISPLAY_NUMBER = 6;

export default function Shop() {
  const { products } = useOutletContext();
  const categoryNames = extractCategories(products);
  const [categories, setCategories] = useState(categoryNames);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((item) =>
    categories.includes(item.category),
  );
  const compartedProducts = filteredProducts.reduce((acc, item, index) => {
    if (index % DISPLAY_NUMBER === 0) acc.push([]);
    acc[Math.floor(index / DISPLAY_NUMBER)].push(item);
    return acc;
  }, []);
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

function SPAPagination({ currentPage, setCurrentPage }) {
  
}
