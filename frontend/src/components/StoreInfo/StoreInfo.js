import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StoreInfo.css";
import Waves from '../Waves/Waves'
import Products from '../../views/Products/Products'
import { useParams } from "react-router";


const StoreInfo = () => {
    var {id} = useParams();
    // var id = 1;

    const [responseData, setResponseData] = useState(null);

    const getStores = () => {
      var config = {
        method: "get",
        url: `http://127.0.0.1:8000/market?id=${id}`,
        // headers: {
        //   Cookie:
        //     "csrftoken=No8wD0cOms43Hh37HiwdjatM4lpChEwbgfLcTTi4gmB1FIQxKrjiujILll3tDA8i",
        // },
      };
      axios(config)
        .then(function (response) {
          setResponseData(response.data[0]);
          console.log(response.data)
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
      <div className="store-info-container">
    {responseData !== null
        ?
    <>
    <div className="store-details-container">
        <div className="store-details">
            
            <img className="logo" src={"http://127.0.0.1:8000" + responseData.logo} alt=""/>
            <div>
            
            <h1 className="name">{responseData.name}</h1>
            <p className="address">{responseData.address}</p>
            </div>
            
        </div>
        <p>9899169906</p>
        <Waves className="small-wave"/>
        <div className="store-products">
    <Products store={id}/>
    </div>
        
    </div>
    
    
    </>
    :null}
    </div>
  );
};

export default StoreInfo;
