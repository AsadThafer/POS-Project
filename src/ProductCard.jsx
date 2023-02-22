import { Link } from "react-router-dom";
import DeleteDialog from "./components/DeleteDialog/DeleteDialog";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      navigate(`/CategoryDetails/${product.categoryId}`);
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
      <DeleteDialog
        id={product.id}
        onConfirm={() => deleteProduct(product.id)}
      />
      <span> Category Id : {product.categoryId}</span>
    </div>
  );
};

export default ProductCard;
