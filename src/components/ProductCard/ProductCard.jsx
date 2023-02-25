import { Link } from "react-router-dom";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
const ProductCard = ({ product, addedToCart, type }) => {
  const navigate = useNavigate();
  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      navigate(`/CategoryDetails/${product.categoryId}`);
      window.location.reload();
      return response.json();
    }
    throw new Error("Error deleting product");
  };
  const handleAdd = (props) => {
    addedToCart(props);
  };

  return (
    <div className="Product_Card" key={product.id}>
      <h3>ID : {product.id}</h3>
      <img className="Product_image" src={product.image} alt={product.name} />
      <Link className="details_link" to={`/ProductDetails/${product.id}`}>
        {product.name}
      </Link>
      <h3>Code : {product.code}</h3>
      <h3>Description : {product.description}</h3>
      <h3 className="Product_Price">Price : {product.price} $</h3>
      {type !== "CartAdd" && (
        <ConfirmDialog
          id={product.id}
          onConfirm={() => deleteProduct(product.id)}
        />
      )}
      {type === "CartAdd" && (
        <button
          onClick={() =>
            console.log("added to cart") ||
            handleAdd({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
        >
          Add to Cart
        </button>
      )}
      <span> Category Id : {product.categoryId}</span>
    </div>
  );
};

export default ProductCard;
