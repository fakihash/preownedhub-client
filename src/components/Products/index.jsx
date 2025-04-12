import React from "react";
import ProductCard from "../ProductCard";

const Products = ({ products }) => {
  return (
    <>
      {products.map((product, index) => (
        <ProductCard index={index} product={product} />
      ))}
    </>
  );
};

export default Products;
