import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({ children, cartLength }) {
  return (
    <div>
      <Header cartLength={cartLength} />
      {children}
      <Footer />
    </div>
  );
}
