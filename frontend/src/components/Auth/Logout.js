import React, { useEffect, useState } from "react";
import "./Login.css";
import Illustration from "../Auth/login_illus.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

toast.configure();


const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("login");
    toast.success("You Have been Successfully Logged Out");
    history.push("/");
  }, [])

  return (
    <div className="login-container">
        <img src={Illustration}/>
    </div>
  );
};

export default Logout;
