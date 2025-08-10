// SPA pagination test

import { useState } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import Shop from "./Shop";

vi.mock("@/components/ProductCard", () => ({
  default: ({ product }) => <div data-testid="product">{product.name}</div>,
}));

// Create 10 products to spread across 2 pages (6 + 4)
const mockProducts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  category: "foo",
  name: `Product ${i + 1}`,
}));

// Provide live categories state (all products in one category)
function TestProvider() {
  const [categories, setCategories] = useState(["foo"]);
  return (
    <Outlet
      context={{
        products: mockProducts,
        categoryNames: ["foo"],
        categories,
        setCategories,
      }}
    />
  );
}

test("splits products into pages of 6 and navigates between them", async () => {
  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <Routes>
        <Route element={<TestProvider />}>
          <Route path="/shop" element={<Shop />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  // Page 1 should show the first 6 items
  const page1Products = await screen.findAllByTestId("product");
  expect(page1Products).toHaveLength(6);
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.getByText("Product 6")).toBeInTheDocument();
  expect(screen.queryByText("Product 7")).not.toBeInTheDocument();

  // Click the "2" page link
  fireEvent.click(screen.getByRole("button", { name: "2" }));

  // Wait for the new slice: items 7–10
  await waitFor(() => {
    const page2Products = screen.getAllByTestId("product");
    expect(page2Products).toHaveLength(4);
  });

  // Assert the correct items on page 2
  expect(screen.getByText("Product 7")).toBeInTheDocument();
  expect(screen.getByText("Product 10")).toBeInTheDocument();
  expect(screen.queryByText("Product 1")).not.toBeInTheDocument();

  // Test the "Previous" arrow
  fireEvent.click(screen.getByRole("button", { name: /Previous/i }));
  await waitFor(() => {
    expect(screen.getAllByTestId("product")).toHaveLength(6);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });
});