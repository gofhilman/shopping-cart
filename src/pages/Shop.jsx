import ProductCard from "@/components/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import extractCategories from "@/lib/extract-categories";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

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
      <div>
        <div>
          {compartedProducts[currentPage - 1].map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        <SPAPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={compartedProducts.length}
        />
      </div>
    </div>
  );
}

function SPAPagination({ currentPage, setCurrentPage, maxPage }) {
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            </PaginationItem>
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage < maxPage && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            {maxPage - currentPage > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
