import { Link } from "react-router-dom";
import Button from "./components/Button/Button";
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
      <h3>Product ID : {product.id}</h3>
      <img className="Product_image" src={product.image} alt={product.name} />
      <Link className="details_link" to={`/ProductDetails/${product.id}`}>
        {product.name}
      </Link>
      <h3>Product Code : {product.code}</h3>
      <h3>Product Description : {product.description}</h3>
      <h3>Product Price : {product.price} $</h3>
      <Button design="delete" onClick={() => deleteProduct(product.id)}>
        Delete Product
      </Button>
      <span> Category Id : {product.categoryId}</span>
    </div>
  );
};

export default ProductCard;
