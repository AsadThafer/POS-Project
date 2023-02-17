import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCategory from "./fetchCategory";

const AddProductForm = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const results = useQuery(["details", id], fetchCategory);
  console.log(id);

  const confirmProductAdd = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const product = Object.fromEntries(data.entries());
    product.createdTime = new Date();
    console.log(product);
    fetch(`http://localhost:3000/categories/${id}/products`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        navigate(`/categories/${id}`);
      }
    });
  };

  if (results.isError) {
    return (
      <div className="error-pane">
        <h2>There was an error. Please try again.</h2>
      </div>
    );
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">↻</h2>
      </div>
    );
  }

  const category = results.data;
  return (
    <div className="details">
      <h2>Category Name : {category.name}</h2>
      <h3>Category ID : {category.id}</h3>
      <button onClick={() => navigate("/")}>Back</button>
      <form onSubmit={confirmProductAdd}>
        <input name="name" placeholder="Product name" type="text" required />
        <input
          name="price"
          placeholder="Product price"
          type="number"
          required
        />
        <input
          name="quantity"
          placeholder="Product quantity"
          type="number"
          required
        />
        <input
          name="description"
          placeholder="Product description"
          type="text"
          required
        />
        <input name="image" placeholder="Product image" type="text" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
