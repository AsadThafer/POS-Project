const fetchProducts = async ({ queryKey }) => {
  const category = queryKey[1];

  if (!category) return [];

  const apiRes = await fetch(
    `http://localhost:3000/products/?categoryId=${category}`
  );
  if (!apiRes.ok) {
    throw new Error("Error fetching products");
  }

  return apiRes.json();
};

export default fetchProducts;
