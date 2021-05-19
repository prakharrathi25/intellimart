import React from "react";
import "./ProductCard.css";

const ProductCard = ({ title, price, quantity }) => {
  return (
    <div className="card-container">
      <div className="product-title-details">
        <img src="https://www.pinclipart.com/picdir/middle/555-5555016_alcohol-hand-sanitizer-png-dettol-sanitizer-clipart.png" />
        <h1 className="product-name">{title}</h1>
      </div>
      <div className="product-info">
        <p>₹{price}</p>
        <p>{quantity}</p>
        <button className="add-button">+</button>
      </div>
    </div>
  );
};

export default ProductCard;
