import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StoreInfo.css";
import Waves from "../Waves/Waves";
import Products from "../../views/Products/Products";
import { useParams } from "react-router";

const StoreInfo = () => {
  var { id } = useParams(); // Gets the variable part of the URL
  const [stores, setStores] = useState(null);

  const getStores = () => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8000/market?id=${id}`,
    };
    axios(config)
      .then(function (response) {
        setStores(response.data[0]);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div className="store-info-container">
      {stores !== null ? (
        <>
          <div className="store-details-container">
            <div className="store-details">
              <img
                className="logo"
                src={"http://127.0.0.1:8000" + stores.logo}
                alt=""
              />
              <div>
                <h1 className="name">{stores.name}</h1>
                <p className="address">{stores.address}</p>
              </div>
            </div>
            <p>{stores.phone_number}</p>
            <Waves className="small-wave" />
            <div className="store-products">
              <Products storeID={id} storeName={stores.name} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default StoreInfo;
