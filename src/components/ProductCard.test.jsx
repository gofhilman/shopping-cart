// Product card button test

import { useState } from "react";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import ProductCard from "./ProductCard";

// 1. Mock price formatter
vi.mock("@/lib/format-rupiah", () => ({
  default: (value) => `Rp${value}`,
}));

// 2. A dummy product to drive the tests
const mockProduct = {
  id: 42,
  title: "Test Product",
  price: 12345,
  image: "/img.png",
};

// 3. Wrap ProductCard in a TestProvider that supplies cart state
function TestProvider() {
  const [cart, setCart] = useState([]);
  return <Outlet context={{ cart, setCart }} />;
}

describe("ProductCard buttons", () => {
  beforeAll(() => {
    // stub out any scrollTo calls in case pagination/nav appears
    window.scrollTo = () => {};
  });

  it("shows 'Add to cart' when qty is zero, then toggles to quantity controls", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<TestProvider />}>
            <Route
              path="/"
              element={<ProductCard product={mockProduct} />}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // a) Initially, "Add to cart" button is visible
    const addBtn = screen.getByRole("button", { name: /add to cart/i });
    expect(addBtn).toBeInTheDocument();

    // b) Click "Add to cart" → quantity should become 1
    fireEvent.click(addBtn);
    expect(await screen.findByText("1")).toBeInTheDocument();

    // c) Now the "-" and "+" buttons appear
    const minusBtn = screen.getByRole("button", { name: "-" });
    const plusBtn = screen.getByRole("button", { name: "+" });
    expect(minusBtn).toBeInTheDocument();
    expect(plusBtn).toBeInTheDocument();
  });

  it("increments and decrements quantity correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<TestProvider />}>
            <Route
              path="/"
              element={<ProductCard product={mockProduct} />}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Start by adding to cart
    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(await screen.findByText("1")).toBeInTheDocument();

    const minusBtn = screen.getByRole("button", { name: "-" });
    const plusBtn = screen.getByRole("button", { name: "+" });

    // 1 → 2
    fireEvent.click(plusBtn);
    expect(await screen.findByText("2")).toBeInTheDocument();

    // 2 → 1
    fireEvent.click(minusBtn);
    expect(await screen.findByText("1")).toBeInTheDocument();

    // 1 → 0  (removes from cart, back to Add to cart)
    fireEvent.click(minusBtn);
    expect(
      await screen.findByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });
});