import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
const ProductsMenu = () => {
  const [products, setProducts] = useState([]); // [state, setState]

  useEffect(() => {
    const getProducts = async () => {
      let uri = "http://localhost:3000/products";
      const response = await fetch(uri);
      const data = await response.json();
      setProducts(data);
    };
    getProducts();
  }, []);
  return (
    <div className="Products_Menu">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsMenu;
