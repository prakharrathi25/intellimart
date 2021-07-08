import React, { useEffect } from "react";
import "./Login.css";
import Illustration from "../Auth/login_illus.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useStoreActions } from "easy-peasy";

toast.configure();

const Logout = () => {
  const history = useHistory();
  const { emptyCart } = useCart();
  const toggleLog = useStoreActions((actions) => actions.toggleLog);

  useEffect(() => {
    localStorage.removeItem("login");
    localStorage.removeItem("react-use-cart");
    emptyCart();

    toast.success("You Have been Successfully Logged Out");
    history.push("/");
    toggleLog();
    toggleLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='login-container'>
      <img src={Illustration} alt='illus' />
    </div>
  );
};

export default Logout;
