import ProductsMenu from "./ProductsMenu";
import Cart from "./Cart";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchAllProducts from "./fetchAllProducts";

const emptycart = [];
const PosPage = () => {
  const products = useQuery(["products"], fetchAllProducts);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || emptycart
  );
  const [discountRate, setDiscountRate] = useState(0);
  const [taxRate, setTaxRate] = useState(0);

  const totalprice = cart.reduce(
    (total, product) =>
      total +
      product.price * product.count -
      (parseInt(discountRate) / 100) * product.price * product.count +
      (parseInt(taxRate) / 100) * product.price * product.count,
    0
  );

  const handleDelete = ({ id }) => {
    setCart((prevcart) => {
      const product = prevcart.find((product) => product.id === id);
      if (product.count === 1) {
        return prevcart.filter((product) => product.id !== id);
      } else {
        return prevcart.map((product) =>
          product.id === id ? { ...product, count: product.count - 1 } : product
        );
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const loadProducts = () => {
    if (products.isLoading) {
      return (
        <div className="loading-pane">
          <h2 className="loader">↻</h2>
        </div>
      );
    }
  };

  const handleCheckout = () => {
    createOrder();
    setCart(emptycart);
    localStorage.setItem("cart", JSON.stringify(emptycart));
  };

  const createOrder = async () => {
    const checkedoutcart = cart.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        count: product.count,
      };
    });
    const doc = {
      cart_Products: checkedoutcart,
      totalprice: totalprice,
      discountRate: discountRate,
      taxRate: taxRate,
      createdTime: new Date(),
    };
    await fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify(doc),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleSuccessfullAdd = (product) => {
    const addedproduct = product;
    loadProducts();
    setCart((prevcart) => {
      const foundproduct = prevcart.find(
        (product) => addedproduct.id === product.id
      );
      if (foundproduct) {
        return prevcart.map((product) =>
          addedproduct.id === product.id
            ? { ...product, count: product.count + 1 }
            : product
        );
      } else {
        return [...prevcart, { ...product, count: 1 }];
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <div>
      <ProductsMenu type={"CartAdd"} onSuccessfullAdd={handleSuccessfullAdd} />

      <Cart
        cart={cart}
        handleDelete={handleDelete}
        totalprice={totalprice}
        discountRate={discountRate}
        taxRate={taxRate}
        setDiscountRate={setDiscountRate}
        setTaxRate={setTaxRate}
      />
      <button
        className="checkout_button"
        onClick={() => {
          handleCheckout();
        }}
      >
        Checkout now
      </button>
    </div>
  );
};
export default PosPage;
