import React, { useState, useEffect } from "react";
import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { useCart } from "react-use-cart";

const Products = ({ storeID, storeName }) => {
  const [responseData, setResponseData] = useState(null);
  const [cart, setCart] = useState([]);
  const { addItem, inCart } = useCart();

  const saveItem = (itemObj) => {
    let tempList = [...cart, itemObj];
    setCart(tempList);
    localStorage.setItem("cart", JSON.stringify(tempList));
  };

  const getProducts = () => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/products?store_id=${storeID}`,
    };
    axios(config)
      .then(function (response) {
        setResponseData(response.data);
        console.log(response.data);
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
      <div className='product-container'>
        {responseData !== null
          ? responseData.map((product, key) => {
              const alreadyAdded = inCart(product.id);
              return (
                <ProductCard
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  image={product.image}
                  product={product.id}
                  description={product.description}
                  category={product.category}
                  store={product.store}
                  unit={product.unit}
                  saveItem={saveItem}
                  key={key}
                  addItem={addItem}
                  alreadyAdded={alreadyAdded}
                  storeName={storeName}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Products;
