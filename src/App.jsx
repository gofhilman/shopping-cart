import "./styles/App.css";
import MainLayout from "./layouts/MainLayout";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default App;
