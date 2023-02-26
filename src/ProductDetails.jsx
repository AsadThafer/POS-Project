import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "./components/Button/Button";
import ConfirmDialog from "./components/ConfirmDialog/ConfirmDialog";
import NotFound from "./components/NotFound/NotFound";
import moment from "moment";
const ProductDetails = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      let uri = `http://localhost:3000/products/${id}`;
      const response = await fetch(uri);
      const data = await response.json();
      setProduct(data);
    };
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);

  const startInlineEdit = () => {
    setIsUpdating(true);
    setName(product.name);
    setPrice(product.price);
    setCode(product.code);
    setDescription(product.description);
    setImage(product.image);
  };

  const cancelInlineEdit = () => {
    setIsUpdating(false);
    setName("");
    setPrice("");
    setCode("");
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
        code,
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
      fetchProduct();
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
      <div className="Product">
        <div className="Product_Card" key={product.id}>
          <img
            className="Product_image"
            src={product.image}
            alt={product.name}
          />
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
          <h3>Product Code :</h3>
          <input
            type="text"
            className="edit_input"
            disabled={isUpdating ? false : true}
            value={isUpdating ? code : product.code}
            onChange={(e) => setCode(e.target.value)}
          ></input>
          <h3>Product Description :</h3>
          <input
            type="text"
            className="edit_input"
            disabled={isUpdating ? false : true}
            value={isUpdating ? description : product.description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <h3>Product last edit time :</h3>
          <p>
            {moment(product.createdTime).format("MMMM Do YYYY, h:mm:ss a")}
            <p>
              (
              {product.createdTime
                ? moment(product.createdTime).fromNow()
                : "No time"}
              )
            </p>
          </p>
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
          <ConfirmDialog
            id={product.id}
            onClick={() => deleteProduct(product.id)}
          />
          <h3>Product Category Id :{product.categoryId}</h3>
        </div>
        <Button design={"back"} onClick={() => navigate("/")}>
          Back Home
        </Button>
        <Button
          design={"back"}
          onClick={() => navigate(`/CategoryDetails/${product.categoryId}`)}
        >
          Category
        </Button>
      </div>
    </>
  );
};

export default ProductDetails;
