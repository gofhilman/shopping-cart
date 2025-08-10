import ProductCard from "@/components/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const DISPLAY_NUMBER = 6;

export default function Shop() {
  const { products, categoryNames, categories, setCategories } =
    useOutletContext();
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
    setCurrentPage(1);
    if (categories.includes(name)) {
      setCategories(categories.filter((item) => item !== name));
    } else {
      setCategories(categories.concat(name));
    }
  };

  return (
    <div className="mb-6 lg:flex lg:gap-x-8">
      <Card className="gap-2 bg-linear-to-br from-orange-300 to-amber-400 px-5 lg:self-start">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Category</CardTitle>
        </CardHeader>
        <Separator className="bg-black" />
        <CardContent>
          <div className="flex flex-col gap-3 pt-3">
            {categoryNames.map((name, index) => (
              <div key={index} className="flex items-center gap-4 text-2xl">
                <input
                  type="checkbox"
                  id={index}
                  checked={categories.includes(name)}
                  onChange={() => handleCheckbox(name)}
                  className="size-6"
                ></input>
                <label htmlFor={index} className="text-xl font-medium">
                  {name[0].toUpperCase() + name.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {compartedProducts.length > 0 && (
        <div className="my-5 lg:flex-1">
          <div className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
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
      )}
    </div>
  );
}

function SPAPagination({ currentPage, setCurrentPage, maxPage }) {
  const handlePagination = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        {currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePagination(currentPage - 1)}
              />
            </PaginationItem>
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => handlePagination(currentPage - 1)}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink
            className="bg-linear-to-br from-orange-300 to-amber-400"
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage < maxPage && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePagination(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            {maxPage - currentPage > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePagination(currentPage + 1)}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
