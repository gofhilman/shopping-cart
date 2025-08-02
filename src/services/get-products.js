// HOW TO USE
// const products = [{id, title, price, description, category, image}, ...];

const USD2IDR = 20000;
const url = "https://fakestoreapi.com/products";

export default async function getProducts() {
  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  const data = await response.json();
  return data.map((item) => {
    item.price = item.price * USD2IDR;
    return item;
  });
}

// getProducts().then((data) => console.log(data));
