import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({ children, itemQuantity, products }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header itemQuantity={itemQuantity} products={products} />
      <div className="flex-1 px-12 pt-22 lg:px-30 lg:pt-28">{children}</div>
      <Footer />
    </div>
  );
}
