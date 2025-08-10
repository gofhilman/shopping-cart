import "./styles/App.css";
import MainLayout from "./layouts/MainLayout";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import useProductData from "./hooks/use-product-data";
import { LoadingSpinner } from "./components/ui/loading-spinner";
import scrollToTop from "./hooks/scroll-to-top";

function App() {
  const [cart, setCart] = useState([]);
  const { products, categoryNames, categories, setCategories } =
    useProductData();
  scrollToTop();

  return (
    <div>
      {products && categoryNames && categories && setCategories ? (
        <MainLayout
          itemQuantity={cart.reduce((acc, item) => acc + item.quantity, 0)}
          products={products}
        >
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
        </MainLayout>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingSpinner className="w-50 text-orange-300" />
        </div>     
      )}
    </div>
  );
}

export default App;
