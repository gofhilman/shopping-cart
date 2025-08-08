import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({ children, itemQuantity, products }) {
  return (
    <div>
      <Header itemQuantity={itemQuantity} products={products} />
      <div className="pt-22 px-12">{children}</div>
      <Footer />
    </div>
  );
}
