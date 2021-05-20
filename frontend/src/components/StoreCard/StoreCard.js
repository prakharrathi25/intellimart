import React from "react";
import "./StoreCard.css";

const StoreCard = ({ title, price, quantity, image }) => {
  return (
    <div className="card-container">
      <div className="store-title-details">
        <img
          className="store-image"
          src="https://www.pinclipart.com/picdir/middle/555-5555016_alcohol-hand-sanitizer-png-dettol-sanitizer-clipart.png"
        />
        {/* <img className="store-image" src={image} /> */}
        <h1 className="store-name">{title}</h1>
      </div>
      <div className="store-info">
        <p className="column">₹{price}</p>
        <p className="column">{quantity}</p>
        <button className="add-button column" onClick={()=>console.log("Clicked")}>+</button>
      </div>
    </div>
  );
};

export default StoreCard;
