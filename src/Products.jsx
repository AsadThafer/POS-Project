import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

import fetchProducts from "./fetchProducts";

const Products = ({ id }) => {
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
