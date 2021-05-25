import React from "react";
import "./ProductCard.css";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ProductCard = ({
  name,
  price,
  quantity,
  image,
  product,
  unit,
  description,
  category,
  store,
  saveItem,
  // key,
  addItem,
  alreadyAdded,
  storeName,
}) => {
  // const { addItem } = useCart();

  // const addToCart = () => {
  //   let cartItem = {};
  //   cartItem["name"] = name;
  //   cartItem["price"] = price;
  //   cartItem["quantity"] = quantity;
  //   cartItem["image"] = image;
  //   saveItem(cartItem);
  // };

  const addItemHandler = () => {
    addItem({
      name: name,
      quantity: quantity,
      price: price,
      id: product,
      storeName: storeName,
      user: localStorage.getItem("login")
        ? localStorage.getItem("login").user_id
        : null,
      image: image,
    });
    toast.info(name + " has been added to cart!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="card-container">
      <div className="product-title-details">
        <img
          className="product-image"
          src={"http://127.0.0.1:8000" + image}
          alt=""
        />
        <h1 className="product-name">{name.substring(0, 14)}</h1>
      </div>
      <div className="product-info">
        <p className="column">₹{price}</p>
        <p className="column">
          {quantity} {unit}
        </p>
        <button
          className="add-button column hover-button"
          // onClick={addToCart}
          onClick={() => addItemHandler()}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
