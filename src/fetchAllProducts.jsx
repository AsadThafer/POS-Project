const fetchAllProducts = async () => {
  const apiRes = await fetch("http://localhost:3000/products");
  if (!apiRes.ok) {
    throw new Error("Error fetching products");
  }

  return apiRes.json();
};

export default fetchAllProducts;
