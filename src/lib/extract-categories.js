export default function extractCategories(products) {
  const categoryNames = [];
  for (const item of products) {
    if (!categoryNames.includes(item.category))
      categoryNames.push(item.category);
  }
  return categoryNames;
}
