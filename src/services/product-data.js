// HOW TO USE
// const productData = [{id, title, price, description, category, image}, ...];

const USD2IDR = 20000;
const dataUrl = "https://fakestoreapi.com/products";

async function fetchProductData(url) {
  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  const data = await response.json();
  return data.map((item) => {
    item.price = item.price * USD2IDR;
    return item;
  });
}

let productData;
try {
  productData = fetchProductData(dataUrl);
} catch (error) {
  console.error("Fetch product data failed:", error.message);
}

// productData.then((data) => console.log(data));

export default productData;
