// Category filtering test

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

const mockProducts = [
  { id: 1, category: "fruit", name: "Apple" },
  { id: 2, category: "vegetable", name: "Carrot" },
];

// A provider that supplies a live categories state via Outlet
function TestProvider() {
  const [categories, setCategories] = useState(["fruit"]);
  const contextValue = {
    products: mockProducts,
    categoryNames: ["fruit", "vegetable"],
    categories,
    setCategories,
  };

  return <Outlet context={contextValue} />;
}

test("filters products by category", async () => {
  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <Routes>
        <Route element={<TestProvider />}>
          <Route path="/shop" element={<Shop />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  // Initial: only Apple (fruit) is rendered
  expect(await screen.findByText("Apple")).toBeInTheDocument();
  expect(screen.queryByText("Carrot")).not.toBeInTheDocument();

  // Click "Vegetable" checkbox to include that category
  fireEvent.click(screen.getByLabelText("Vegetable"));

  // Now both appear
  await waitFor(() => {
    expect(screen.getByText("Carrot")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  // Uncheck "Fruit" to remove it
  fireEvent.click(screen.getByLabelText("Fruit"));

  // Apple disappears, Carrot remains
  await waitFor(() => {
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });
  expect(screen.getByText("Carrot")).toBeInTheDocument();
});