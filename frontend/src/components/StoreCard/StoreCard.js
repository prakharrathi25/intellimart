import React, { useState } from "react";
import "./StoreCard.css";
import { Link } from "react-router-dom";

const StoreCard = ({ title, address, image, id }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };

  return (
    <>
      <div className='store-card-container' onClick={() => toggleModal()}>
        <Link to={`/store/${id}`}>
          <div className='store-title-details'>
            <img
              className='store-image'
              src={process.env.REACT_APP_API_URL + image}
              alt='store'
            />
          </div>

          <div className='store-info'>
            <h1 className='store-name'>{title}</h1>
            <p className='column' id='address'>
              {address}
            </p>
          </div>
          {/* <button
            className="more-button column"
            onClick={() => console.log("Clicked")}
          >
            {" "}
            ᐅ{" "}
          </button> */}
          {/* </div> */}
        </Link>
      </div>
    </>
  );
};

export default StoreCard;
