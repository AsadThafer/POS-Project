import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCategory from "../../../helpers/fetchCategories/fetchCategory";
import Products from "./Products";
import { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import NotFound from "../../NotFound/NotFound";
import moment from "moment";
const CategoryDetails = () => {
  const [category, setCategory] = useState({});
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const results = useQuery(["details", id], fetchCategory, {
    staleTime: 300000,
    refetchInterval: 300000,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    const getProduct = async () => {
      let uri = `http://localhost:3000/categories/${id}`;
      const response = await fetch(uri);
      const data = await response.json();
      setCategory(data);
      console.log(data);
    };
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);

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
      navigate("/CategoriesCRUD");
      return response.json();
    }
    throw new Error("Error deleting category");
  };

  if (results.isError) {
    return <NotFound />;
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">↻</h2>
      </div>
    );
  }

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
        <p>
          Category Last edit Time :
          {moment(category.createdTime).format("MMMM Do YYYY, h:mm:ss a")}({" "}
          {moment(category.createdTime).fromNow()} )
        </p>
        <Button
          design="update"
          onClick={() => startInlineEdit(category.id)}
          style={{ display: isUpdating ? "none" : "inline" }}
        >
          Update Category
        </Button>
        <Button
          style={{ display: isUpdating ? "inline" : "none" }}
          design="confirm"
          onClick={() => updateCategory(category.id)}
        >
          confirm Update
        </Button>
        <Button
          design="cancel"
          onClick={() => cancelInlineEdit(category.id)}
          style={{ display: isUpdating ? "inline" : "none" }}
        >
          cancel Update
        </Button>
        <ConfirmDialog
          id={category.id}
          onConfirm={() => deleteCategory(category.id)}
        />
        <Link
          className="Add_product_link"
          to={`/AddProductForm/${category.id}`}
        >
          Add Product
        </Link>
        <Products id={category.id} />
      </div>
      <Button design={"back"} onClick={() => navigate("/")}>
        Back Home
      </Button>
    </>
  );
};

export default CategoryDetails;
