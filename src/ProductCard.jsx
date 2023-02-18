import { Link } from "react-router-dom";

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
  );
};

export default ProductCard;
