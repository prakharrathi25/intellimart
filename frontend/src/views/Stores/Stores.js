import React, { useState, useEffect } from "react";
import "./Stores.css";
import StoreCard from "../../components/StoreCard/StoreCard";
import axios from "axios";
import Loader from "../../components/loader";

const Stores = () => {
  const [responseData, setResponseData] = useState(null);

  const getStores = () => {
    console.log(process.env.REACT_APP_API_URL);
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/market`,
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
