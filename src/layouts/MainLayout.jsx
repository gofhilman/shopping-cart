import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({ children, itemQuantity }) {
  return (
    <div>
      <Header itemQuantity={itemQuantity} />
      <div className="pt-15">
        {children}
      </div>
      <Footer />
    </div>
  );
}
