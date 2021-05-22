import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StoreInfo.css";
import "../../views/Stores/Stores";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { useParams } from "react-router";

const StoreInfo = (show, toggle) => {
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
          setResponseData(response.data);
          console.log(response.data[0])
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
      <>
    {responseData !== null
        ?
    <Dialog open={show} onClose={toggle} maxWidth="md" fullWidth={true}>
      <DialogTitle>{responseData[0].name}</DialogTitle>
      <DialogContent>
        <DialogContentText>What do you wanna do next?</DialogContentText>
        {/* <input name="taskName" value={taskName} onChange={handleChange}/>
        <input name="category"value={category} onChange={handleChange}/>
        <button className="task-submit"onClick={handleSave}>Create</button> */}
      </DialogContent>
    </Dialog>:null}
    </>
  );
};

export default StoreInfo;
