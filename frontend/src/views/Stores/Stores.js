import React, { useState, useEffect } from "react";
import "./Stores.css";
import StoreCard from "../../components/StoreCard/StoreCard";
import StoreInfo from '../../components/StoreInfo/StoreInfo'
import axios from "axios";
import Loader from '../../components/loader'

const Stores = () => {
  const [responseData, setResponseData] = useState(null);

  const getStores = () => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/market",
      // headers: {
      //   Cookie:
      //     "csrftoken=No8wD0cOms43Hh37HiwdjatM4lpChEwbgfLcTTi4gmB1FIQxKrjiujILll3tDA8i",
      // },
    };
    axios(config)
      .then(function (response) {
        setResponseData(response.data);
        console.log(response.data[0].id)
        // console.log(response.data);
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
      <div className="store-container">
        {responseData !== null
          ? responseData.map((stores, index) => (
            // <div onClick={toggleModal}>
              <StoreCard
                title={stores.name}
                address={stores.address}
                image={stores.logo}
                id={stores.id}
                
              />
              // </div>
            ))
          : <Loader/>}
      </div>
    </div>
  );
};

export default Stores;
