const fetchAllOrders = async () => {
  const apiRes = await fetch("http://localhost:3000/orders");
  if (!apiRes.ok) {
    throw new Error("Error fetching orders");
  }

  return apiRes.json();
};

export default fetchAllOrders;
