import React, { useState, useEffect } from "react";
import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const Products = () => {
  const [responseData, setResponseData] = useState(null);
  const [cart, setCart] = useState([]);

  const saveItem = (itemObj) => {
    let tempList = [...cart, itemObj];
    setCart(tempList);
    localStorage.setItem("cart", JSON.stringify(tempList));
    
  };

  const getProducts = () => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/products",
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
          ? responseData.map((product) => (
              <ProductCard
                title={product.name}
                price={product.price}
                quantity={product.quantity}
                image={product.image}
                key={product.id}
                saveItem={saveItem}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Products;
