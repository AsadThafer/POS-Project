import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCategory from "./fetchCategory";
import Products from "./Products";
import { useState } from "react";

const CategoryDetails = () => {
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const startInlineEdit = () => {
    setIsUpdating(true);
    setName(category.name);
  };

  const cancelInlineEdit = () => {
    setIsUpdating(false);
    setName("");
  };

  const updateCategory = async (id) => {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        createdTime: new Date(),
      }),
    });
    if (response.ok) {
      cancelInlineEdit();
      return response.json();
    }
    throw new Error("Error updating category");
  };

  const deleteCategory = async (id) => {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      navigate("/");
      return response.json();
    }
    throw new Error("Error deleting category");
  };

  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const results = useQuery(["details", id], fetchCategory);

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
    <>
      <div className="details">
        <h2>Category ID : {category.id}</h2>
        Category Name :
        <input
          type="text"
          className="edit_input"
          disabled={isUpdating ? false : true}
          value={isUpdating ? name : category.name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <h3>Category Created Time :{category.createdTime.toString()}</h3>
        <button
          className="update_button"
          onClick={() => startInlineEdit(category.id)}
          style={{ display: isUpdating ? "none" : "block" }}
        >
          Update Category
        </button>
        <button
          style={{ display: isUpdating ? "block" : "none" }}
          className="confirm_button"
          onClick={() => updateCategory(category.id)}
        >
          confirm Update
        </button>
        <button
          className="cancel_button"
          onClick={() => cancelInlineEdit(category.id)}
          style={{ display: isUpdating ? "block" : "none" }}
        >
          cancel Update
        </button>
        <button
          className="delete_button"
          style={{ display: isUpdating ? "none" : "block" }}
          onClick={() => deleteCategory(category.id)}
        >
          Delete Category
        </button>
        <Products id={category.id} />
        <Link
          className="Add_product_link"
          to={`/AddProductForm/${category.id}`}
        >
          {" "}
          Add Product{" "}
        </Link>
      </div>
      <button onClick={() => navigate("/")}>Back</button>
    </>
  );
};

export default CategoryDetails;
