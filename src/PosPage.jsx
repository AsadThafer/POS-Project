import ProductsMenu from "./ProductsMenu";
import Cart from "./Cart";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchAllProducts from "./fetchAllProducts";
import ConfirmDialog from "./components/ConfirmDialog/ConfirmDialog";
import "./POSPage.css";

const emptycart = [];
const PosPage = () => {
  const checkout = "checkout";
  const clear = "clear";
  const products = useQuery(["products"], fetchAllProducts);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || emptycart
  );
  const [discountRate, setDiscountRate] = useState(
    JSON.parse(localStorage.getItem("discountRate")) || 0
  );

  const [taxRate, setTaxRate] = useState(
    JSON.parse(localStorage.getItem("taxRate")) || 0
  );

  const totalprice = cart.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  const finalprice =
    totalprice -
    totalprice * (discountRate / 100) +
    totalprice * (taxRate / 100);

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
    if (cart.length === 0) {
      return;
    }
    if (discountRate > 100 || discountRate < 0) {
      return;
    }
    if (taxRate > 100 || taxRate < 0) {
      return;
    }
    createOrder();
    setCart(emptycart);
    setDiscountRate(0);
    setTaxRate(0);
    window.location.reload();
  };

  const clearCart = () => {
    setCart(emptycart);
    setDiscountRate(0);
    setTaxRate(0);
    window.scrollTo(0, 0);
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
      totalprice: finalprice,
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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("discountRate", JSON.stringify(discountRate));
    localStorage.setItem("taxRate", JSON.stringify(taxRate));
  }, [cart, discountRate, taxRate]);

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
  };
  return (
    <div className="PosPage">
      <ProductsMenu type={"CartAdd"} onSuccessfullAdd={handleSuccessfullAdd} />

      <Cart
        cart={cart}
        handleDelete={handleDelete}
        totalprice={totalprice}
        discountRate={discountRate}
        taxRate={taxRate}
        setDiscountRate={setDiscountRate}
        setTaxRate={setTaxRate}
        finalprice={finalprice}
      >
        {cart.length > 0 ? (
          <>
            <ConfirmDialog
              type={checkout}
              onConfirm={() => {
                handleCheckout();
              }}
            />
            <ConfirmDialog
              type={clear}
              onConfirm={() => {
                clearCart();
              }}
            />
          </>
        ) : null}
      </Cart>
    </div>
  );
};
export default PosPage;
