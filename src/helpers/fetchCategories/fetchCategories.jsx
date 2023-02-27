const fetchCategories = async () => {
  const apiRes = await fetch(`http://localhost:3000/categories`);
  if (!apiRes.ok) {
    throw new Error("Error fetching categories");
  }
  return apiRes.json();
};

export default fetchCategories;

//By default, UseQuery library cache the data fetched so that subsequent requests for the same data can be served from the cache
// instead of making another API call . This is done to improve performance and reduce the number of API calls made to the server.
