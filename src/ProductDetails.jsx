import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";

const ProductDetails = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const startInlineEdit = () => {
    setIsUpdating(true);
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDescription(product.description);
    setImage(product.image);
  };

  const cancelInlineEdit = () => {
    setIsUpdating(false);
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setImage("");
  };

  const updateProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        quantity,
        description,
        image,
        createdTime: new Date(),
      }),
    });
    if (response.ok) {
      cancelInlineEdit();
      return response.json();
    }
    throw new Error("Error updating product");
  };

  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error("Error deleting product");
  };
  const { id } = useParams();
  const fetchProduct = async () => {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    if (response.ok) {
      return response.json();
    }
    throw new Error("Error fetching product");
  };
  const results = useQuery(["product", id], fetchProduct);
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
  const product = results.data;
  return (
    <>
      <div className="Product_Card" key={product.id}>
        <img className="Product_image" src={product.image} alt={product.name} />
        <h3>Product ID : {product.id}</h3>
        Product Name :
        <input
          type="text"
          className="edit_input"
          disabled={isUpdating ? false : true}
          value={isUpdating ? name : product.name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <h3>Product Price :</h3>
        <input
          type="text"
          className="edit_input"
          disabled={isUpdating ? false : true}
          value={isUpdating ? price : product.price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <h3>Product Quantity :</h3>
        <input
          type="text"
          className="edit_input"
          disabled={isUpdating ? false : true}
          value={isUpdating ? quantity : product.quantity}
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
        <h3>Product Description :</h3>
        <input
          type="text"
          className="edit_input"
          disabled={isUpdating ? false : true}
          value={isUpdating ? description : product.description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <h3>
          Product last edit time :
          {product.createdTime ? product.createdTime.toString() : "No time"}
        </h3>
        <Button
          design="update"
          onClick={() => startInlineEdit(product.id)}
          style={{ display: isUpdating ? "none" : "block" }}
        >
          Update Product
        </Button>
        <Button
          style={{ display: isUpdating ? "block" : "none" }}
          design="confirm"
          onClick={() => updateProduct(product.id)}
        >
          confirm Update
        </Button>
        <Button
          design="cancel"
          onClick={() => cancelInlineEdit(product.id)}
          style={{ display: isUpdating ? "block" : "none" }}
        >
          cancel Update
        </Button>
        <Button
          design="delete"
          style={{ display: isUpdating ? "none" : "block" }}
          onClick={() => deleteProduct(product.id)}
        >
          Delete Product
        </Button>
      </div>
      <Link to={`/`} className="details_link">
        Back to Home Page
      </Link>
    </>
  );
};

export default ProductDetails;
