import { useState } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import Cart from "./Cart";

// Mock the currency formatter
vi.mock("@/lib/format-rupiah", () => ({
  default: (value) => `Rp${value}`,
}));

// Stub CartCard to just render title and quantity
vi.mock("@/components/CartCard", () => ({
  default: ({ product }) => (
    <div data-testid="cart-item">
      {product.title} x {product.quantity}
    </div>
  ),
}));

// Provider supplying cart state via Outlet context
function TestProvider({ initialCart }) {
  const [cart, setCart] = useState(initialCart);
  return <Outlet context={{ cart, setCart }} />;
}

// Testing empty cart
describe("Cart – empty state", () => {
  it("renders the empty cart message and 'Continue shopping' button", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route element={<TestProvider initialCart={[]} />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    // The heading
    expect(
      screen.getByRole("heading", { name: /your shopping cart/i }),
    ).toBeInTheDocument();

    // Empty-cart message
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();

    // Continue shopping button
    expect(
      screen.getByRole("link", { name: /continue shopping/i }),
    ).toBeInTheDocument();
  });
});

//Testing total calculation
describe("Cart – order summary", () => {
  it("calculates subtotal and total based on cart contents", () => {
    // 2 items: (2 * 100) + (3 * 200) = 800
    const mockCart = [
      { id: 1, title: "Alpha", price: 100, quantity: 2 },
      { id: 2, title: "Beta", price: 200, quantity: 3 },
    ];

    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route element={<TestProvider initialCart={mockCart} />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    // Each item should render via our stub
    const items = screen.getAllByTestId("cart-item");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Alpha x 2");
    expect(items[1]).toHaveTextContent("Beta x 3");

    // Grab every node that says "Rp800" and assert two of them
    const priceNodes = screen.getAllByText("Rp800");
    expect(priceNodes).toHaveLength(2);
    expect(priceNodes[0].previousElementSibling?.textContent).toMatch(
      /Subtotal/i,
    );
    expect(priceNodes[1].previousElementSibling?.textContent).toMatch(/Total/i);

    // Shipping should be "Free"
    expect(screen.getByText("Free")).toBeInTheDocument();
  });
});
