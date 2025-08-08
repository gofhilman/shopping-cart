import "./styles/App.css";
import MainLayout from "./layouts/MainLayout";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import useProductData from "./hooks/use-product-data";
import { LoadingSpinner } from "./components/ui/loading-spinner";

function App() {
  const [cart, setCart] = useState([]);
  const { products, categoryNames, categories, setCategories } =
    useProductData();

  return (
    <MainLayout
      itemQuantity={cart.reduce((acc, item) => acc + item.quantity, 0)}
      products={products}
    >
      {products && categoryNames && categories && setCategories ? (
        <Outlet
          context={{
            cart,
            setCart,
            products,
            categoryNames,
            categories,
            setCategories,
          }}
        />
      ) : (
        <LoadingSpinner />
      )}
    </MainLayout>
  );
}

export default App;
