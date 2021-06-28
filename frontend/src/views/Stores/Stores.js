import React, { useState, useEffect } from "react";
import "./Stores.css";
import StoreCard from "../../components/StoreCard/StoreCard";
import StoreInfo from "../../components/StoreInfo/StoreInfo";
import axios from "axios";
import Loader from "../../components/loader";

const Stores = () => {
  const [responseData, setResponseData] = useState(null);

  const getStores = () => {
    var config = {
      method: "get",
      url: "/market",
    };
    axios(config)
      .then(function (response) {
        setResponseData(response.data);
        console.log(response.data[0].id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div>
      <div className='store-container'>
        {responseData !== null ? (
          responseData.map((stores, index) => (
            // <div onClick={toggleModal}>
            <StoreCard
              title={stores.name}
              address={stores.address}
              image={stores.logo}
              id={stores.id}
            />
            // </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Stores;
