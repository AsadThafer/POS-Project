import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import fetchProducts from "./fetchProducts";

const Products = ({ id }) => {
  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error("Error deleting product");
  };

  const results = useQuery(["products", id], fetchProducts);

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
  const products = results.data;
  return (
    <div className="Products_Menu">
      {products.map((product) => (
        <div className="Product_Card" key={product.id}>
          <img
            className="Product_image"
            src={product.image}
            alt={product.name}
          />
          <h3>Product ID : {product.id}</h3>
          <h2>Product Name : {product.name}</h2>
          <h3>Product Price : {product.price}</h3>
          <h3>Product Quantity : {product.quantity}</h3>
          <h3>Product Description : {product.description}</h3>
          <h3>
            {product.createdTime ? product.createdTime.toString() : "No time"}
          </h3>
          <Link className="details_link" to={`/ProductDetails/${product.id}`}>
            Product Details
          </Link>
          <button
            className="delete_button"
            onClick={() => deleteProduct(product.id)}
          >
            Delete Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
