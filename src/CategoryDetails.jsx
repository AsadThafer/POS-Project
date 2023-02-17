import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCategory from "./fetchCategory";
import fetchProducts from "./fetchProducts";

const CategoryDetails = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const results = useQuery(["details", id], fetchCategory);

  const productsresults = useQuery(["products", id], fetchProducts);

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
  const products = productsresults.data;
  return (
    <>
      <div className="details">
        <h2>Category ID : {category.id}</h2>
        <h2>Category Name :{category.name}</h2>
        <h3>Category Created Time :{category.createdTime.toString()}</h3>

        {productsresults.isError || productsresults.isLoading ? (
          <h2>There is no products in this category</h2>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div className="Product_Card" key={product.id}>
              <img
                className="Product_image"
                src={product.image}
                alt={product.name}
              />
              <h4>product name : {product.name}</h4>
              <h4>product price :{product.price} $</h4>
              <h4>product description :{product.description}</h4>
              <h4>
                product created time :
                {product.createdTime
                  ? product.createdTime.toString()
                  : "No time"}
              </h4>
            </div>
          ))
        ) : (
          <h2>There is no products in this category</h2>
        )}
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
