import Fuse from "fuse.js";
import { Input } from "./ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar({ products, setDialogOpen, className }) {
  const [searchText, setSearchText] = useState("");
  const options = {
    includeScore: true,
    keys: [
      {
        name: "title",
        weight: 0.75,
      },
      {
        name: "description",
        weight: 0.05,
      },
      {
        name: "category",
        weight: 0.2,
      },
    ],
  };
  const searchResult = new Fuse(products, options).search(searchText);
  // console.log(searchResult);

  return (
    <div className="self-stretch">
      <Input
        type="search"
        placeholder="Search a product"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        className={className}
      />
      {searchResult.length > 0 && (
        <ul className="absolute inset-x-0 top-full max-h-50 overflow-y-auto border-b-1 bg-white pr-6 pb-2 pl-15 shadow-[0px_5px_5px_-5px_rgba(0,0,0,0.75)]">
          {searchResult.map((result) => (
            <li
              key={result.item.id}
              onClick={() => setDialogOpen(false)}
              className="truncate py-0.5 text-lg"
            >
              <Link
                to={
                  "/product/" +
                  encodeURIComponent(result.item.title + "-" + result.item.id)
                }
              >
                {result.item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
