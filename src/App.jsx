import "./styles/App.css";
import MainLayout from "./layouts/MainLayout";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <MainLayout cartLength={cart.length}>
      <Outlet context={[cart, setCart]} />
    </MainLayout>
  );
}

export default App;
