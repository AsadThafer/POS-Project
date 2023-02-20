import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCategory from "./fetchCategory";
import Button from "./Button";
import fetchCategories from "./fetchCategories";

const AddProductForm = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  let { id } = useParams();

  const results = useQuery(["details", id], fetchCategory);
  const categories = useQuery(["categories"], fetchCategories);

  const confirmProductAdd = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const product = Object.fromEntries(data.entries());
    product.createdTime = new Date();
    console.log(product);
    if (product.categoryId === id) {
      fetch(`http://localhost:3000/categories/${id}/products`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          navigate(`/CategoryDetails/${id}`);
        }
      });
    }
    if (product.categoryId !== id) {
      fetch(`http://localhost:3000/categories/${product.categoryId}/products`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          navigate(`/CategoryDetails/${product.categoryId}`);
        }
      });
    }
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

  if (categories.isLoading)
    return (
      <div className="loading-pane">
        {" "}
        <h2 className="loader">↻</h2>{" "}
      </div>
    );
  if (categories.isError)
    return (
      <div className="error-pane">
        {" "}
        <h2>There was an error. Please try again.</h2>{" "}
      </div>
    );

  const category = results.data;
  const categoryList = categories.data;
  console.log(categoryList);
  return (
    <div className="details">
      <h2>
        Category Name : {category.name ? category.name : "No specific category"}
      </h2>
      <h3>
        Category ID : {category.id ? category.id : "No specific category"}
      </h3>

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
        <select name="categoryId" id="categoryId">
          {categoryList.map((categoryelement) => (
            <option
              key={categoryelement.id}
              value={categoryelement.id}
              selected={categoryelement.id === category.id ? true : false}
            >
              {categoryelement.name}
            </option>
          ))}
        </select>
        <Button type="submit">Add Product</Button>
      </form>
      <Button onClick={() => navigate("/")}>Back</Button>
    </div>
  );
};

export default AddProductForm;
