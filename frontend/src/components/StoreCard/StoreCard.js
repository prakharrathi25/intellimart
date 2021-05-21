import React from "react";
import "./StoreCard.css";

const StoreCard = ({ title, address, image,key }) => {
  return (
    <div className="store-card-container">
      <div className="store-title-details">
        <img
          className="store-image"
          src={"http://127.0.0.1:8000" + image}
        />
        <h1 className="store-name">{title}</h1>
      </div>
      <div className="store-info">
        <p className="column" id="address">{address}</p>
        <button className="more-button column" onClick={()=>console.log("Clicked")}> ᐅ </button>
      </div>
    </div>
  );
};

export default StoreCard;
