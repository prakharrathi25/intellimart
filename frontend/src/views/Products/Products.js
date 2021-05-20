import React from "react";
import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";

const Products = () => {
  return (
    <div>
      <Navbar />
      <div className="product-container">
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
        <ProductCard title="Dettol" price="2" quantity="500g" />
      </div>
    </div>
  );
};

export default Products;
