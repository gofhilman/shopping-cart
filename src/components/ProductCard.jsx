import formatRupiah from "@/lib/format-rupiah";
import { Card, CardContent, CardFooter } from "./ui/card";

export default function ProductCard({ product }) {
  return (
    <Card>
      <CardContent>
        <img src={product.image} alt="Product image" />
        <h3>{product.title}</h3>
        <p>{formatRupiah(product.price)}</p>
      </CardContent>
      <CardFooter>
        {/* WIP */}
      </CardFooter>
    </Card>
  );
}
