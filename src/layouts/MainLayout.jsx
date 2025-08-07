import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({ children, itemQuantity, products }) {
  return (
    <div>
      <Header itemQuantity={itemQuantity} products={products} />
      <div className="pt-20">{children}</div>
      <Footer />
    </div>
  );
}
