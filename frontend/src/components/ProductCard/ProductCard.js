import React from "react";
import "./ProductCard.css";

const ProductCard = ({ title, price, quantity, image }) => {
  return (
    <div className="card-container">
      <div className="product-title-details">
        <img
          className="product-image"
          alt=""
          // src="https://www.pinclipart.com/picdir/middle/555-5555016_alcohol-hand-sanitizer-png-dettol-sanitizer-clipart.png"
        />
        <img className="product-image" src={"http://127.0.0.1:8000" + image} />
        <h1 className="product-name">{title}</h1>
      </div>
      <div className="product-info">
        <p className="column">₹{price}</p>
        <p className="column">{quantity}</p>
        <button className="add-button column" onClick={()=>console.log("Clicked")}>+</button>
      </div>
    </div>
  );
};

export default ProductCard;
