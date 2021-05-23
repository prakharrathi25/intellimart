import React from "react";
import "./ProductCard.css";
// import {useState} from 'react';



const ProductCard = ({ title, price, quantity, image, saveItem }) => {

  

  const addToCart=()=>{
    let cartItem={};
    cartItem['title']=title;
    cartItem['price']=price;
    cartItem['quantity']=quantity;
    cartItem['image']=image;
    saveItem(cartItem)
  }

  return (
    <div className="card-container">
      <div className="product-title-details">
        <img className="product-image" src={"http://prakharrathi25.pythonanywhere.com" + image} alt="" />
        <h1 className="product-name">{title}</h1>
      </div>
      <div className="product-info">
        <p className="column">₹{price}</p>
        <p className="column">{quantity}</p>
        <button className="add-button column" 
        onClick={addToCart}
        >+</button>
      </div>
    </div>
  );
};

export default ProductCard;
