import React, { useEffect, useState } from "react";
import "./Login.css";
import Illustration from "../Auth/login_illus.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useCart } from "react-use-cart";

toast.configure();

const Logout = () => {
  const history = useHistory();
  const { emptyCart } = useCart();

  useEffect(() => {
    localStorage.removeItem("login");
    localStorage.removeItem("react-use-cart");
    emptyCart();  
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
