const fetchCategories = async () => {
  const apiRes = await fetch(`http://localhost:3000/categories`);
  if (!apiRes.ok) {
    throw new Error("Error fetching categories");
  }
  return apiRes.json();
};

export default fetchCategories;
