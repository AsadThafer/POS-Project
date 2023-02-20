import { Link } from "react-router-dom";
import Button from "./Button";

const ProductCard = ({ product }) => {
  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error("Error deleting product");
  };

  return (
    <div className="Product_Card" key={product.id}>
      <img className="Product_image" src={product.image} alt={product.name} />
      <h3>Product ID : {product.id}</h3>

      <h2>Product Name : {product.name}</h2>
      <h3>Product Price : {product.price}</h3>
      <h3>Product Quantity : {product.quantity}</h3>
      <h3>Product Description : {product.description}</h3>

      <h3>
        Product last updated :
        {product.createdTime ? product.createdTime.toString() : "No time"}
      </h3>
      <Link className="details_link" to={`/ProductDetails/${product.id}`}>
        Product Details
      </Link>
      <Button design="delete" onClick={() => deleteProduct(product.id)}>
        Delete Product
      </Button>
      <h3> Category Id : {product.categoryId}</h3>
    </div>
  );
};

export default ProductCard;
