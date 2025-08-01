import "./styles/App.css";
import MainLayout from "./layouts/MainLayout";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import useProductData from "./hooks/use-product-data";
import { LoadingSpinner } from "./components/ui/loading-spinner";

function App() {
  const [cart, setCart] = useState([]);
  const products = useProductData();

  return (
    <MainLayout cartLength={cart.length}>
      {products ? (
        <Outlet context={[cart, setCart, products]} />
      ) : (
        <LoadingSpinner />
      )}
    </MainLayout>
  );
}

export default App;
