import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import fetchAllProducts from "../fetchProducts/fetchAllProducts";
import { useQuery } from "@tanstack/react-query";

function BarcodeScanner() {
  const [result, setResult] = useState("");
  const products = useQuery(["products"], fetchAllProducts);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  if (products.isLoading)
    return (
      <div className="loading-pane">
        {" "}
        <h2 className="loader">↻</h2>{" "}
      </div>
    );

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
        legacyMode={false}
        facingMode={"environment"}
        containerStyle={{
          width: "300px",
          height: "300px",
          margin: "auto",
          border: "1px solid black",
        }}
        videoStyle={{ width: "300px", height: "300px" }}
      />
      <p>{result}</p>
      {products.data.map((product) => {
        if (product.code === result) {
          return product;
        }
      })}
    </div>
  );
}

export default BarcodeScanner;
