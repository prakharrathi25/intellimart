import React, { useState, useEffect } from "react";
import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const Products = () => {
  const [responseData, setResponseData] = useState(null);

  const getProducts = () => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/products",
      // headers: {
      //   Cookie:
      //     "csrftoken=No8wD0cOms43Hh37HiwdjatM4lpChEwbgfLcTTi4gmB1FIQxKrjiujILll3tDA8i",
      // },
    };
    axios(config)
      .then(function (response) {
        setResponseData(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="product-container">
        {responseData !== null
          ? responseData.map((product, index) => (
            <>
              <ProductCard
                title={product.name}
                price={product.price}
                quantity={product.quantity}
                image={product.image}
                key={index}
              />
              <ProductCard
                title={product.name}
                price={product.price}
                quantity={product.quantity}
                image={product.image}
                key={index}
              />
              <ProductCard
                title={product.name}
                price={product.price}
                quantity={product.quantity}
                image={product.image}
                key={index}
              />
              <ProductCard
                title={product.name}
                price={product.price}
                quantity={product.quantity}
                image={product.image}
                key={index}
              />
              </>
            ))
          : null}

        {/* <ProductCard title="Dettol" price="2" quantity="500g" />
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
        <ProductCard title="Dettol" price="2" quantity="500g" /> */}
      </div>
    </div>
  );
};

export default Products;
