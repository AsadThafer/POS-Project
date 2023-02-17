const fetchCategory = async ({ queryKey }) => {
  const category = queryKey[1];

  if (!category) return [];

  const apiRes = await fetch(`http://localhost:3000/categories/${category}`);
  if (!apiRes.ok) {
    throw new Error("Error fetching category");
  }
  return apiRes.json();
};

export default fetchCategory;
