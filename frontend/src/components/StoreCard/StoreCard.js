import React, { useState } from "react";
import "./StoreCard.css";
import StoreInfo from "../StoreInfo/StoreInfo";
import {Link} from "react-router-dom"

const StoreCard = ({ title, address, image, id }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(showModal)
  };

  return (
    <>
      {/* {showModal? */}
      
      {/* <StoreInfo show={showModal} toggle={toggleModal} id={key} /> */}
      {/* :null} */}
      <div className="store-card-container" onClick={()=>toggleModal()}>
        <Link to={`/store/${id}`}>
        <div className="store-title-details">
          <img className="store-image" src={"http://prakharrathi25.pythonanywhere.com" + image} />
          <h1 className="store-name">{title}</h1>
        </div>
        <div className="store-info">
          <p className="column" id="address">
            {address}
          </p>
          <button
            className="more-button column"
            onClick={() => console.log("Clicked")}
          >
            {" "}
            ᐅ{" "}
          </button>
        </div>
        </Link>
      </div>
      
    </>
  );
};

export default StoreCard;
