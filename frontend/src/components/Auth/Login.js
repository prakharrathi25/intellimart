import React, { useState } from "react";
import "./Login.css";
import Illustration from "../Auth/login_illus.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

toast.configure();

const formPanelTwoHandler = () => {
  // console.log("formPanelTwoHandler clicked");
  document.getElementsByClassName("form-toggle")[0].classList.add("visible");
  document.getElementsByClassName("form-panel one")[0].classList.add("hidden");
  document.getElementsByClassName("form-panel two")[0].classList.add("active");
};
const formToggleHandler = () => {
  // console.log("formToggleHandler clicked");
  document.getElementsByClassName("form-toggle")[0].classList.remove("visible");
  document
    .getElementsByClassName("form-panel one")[0]
    .classList.remove("hidden");
  document
    .getElementsByClassName("form-panel two")[0]
    .classList.remove("active");
};

const Login = () => {
  const [responseData, setResponseData] = useState(null);
  const [signInFormValues, setSignInFormValues] = useState({
    email: "",
    password: "",
  });
  /* eslint-disable no-unused-vars */
  const [signUpFormInitialValues, setSignUpFormInitialValues] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  /* eslint-disable no-unused-vars */
  const [signUpFormValues, setSignUpFormValues] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const history = useHistory();

  const toggleLog = useStoreActions((actions) => actions.toggleLog);

  // SignIn Handlers
  const handleSignInEmail = (event) => {
    event.persist();
    setSignInFormValues((signInFormValues) => ({
      ...signInFormValues,
      email: event.target.value,
    }));
  };
  const handleSignInPassword = (event) => {
    event.persist();
    setSignInFormValues((signInFormValues) => ({
      ...signInFormValues,
      password: event.target.value,
    }));
  };

  // SignUp Handlers
  const handleSignUpName = (event) => {
    event.persist();
    setSignUpFormValues((signUpFormValues) => ({
      ...signUpFormValues,
      name: event.target.value,
    }));
  };
  const handleSignUpEmail = (event) => {
    event.persist();
    setSignUpFormValues((signUpFormValues) => ({
      ...signUpFormValues,
      email: event.target.value,
    }));
  };
  const handleSignUpMobile = (event) => {
    event.persist();
    setSignUpFormValues((signUpFormValues) => ({
      ...signUpFormValues,
      mobile: event.target.value,
    }));
  };
  const handleSignUpPassword = (event) => {
    event.persist();
    setSignUpFormValues((signUpFormValues) => ({
      ...signUpFormValues,
      password: event.target.value,
    }));
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log(signInFormValues);

    var data = JSON.stringify({
      email: signInFormValues.email,
      password: signInFormValues.password,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let resData = response.data;
        if (resData.success === "True") {
          setResponseData(resData);
          localStorage.setItem("login", JSON.stringify(resData));
          toggleLog();
          toast.success(`Welcome Back, ${responseData.name}!`);
          history.push("/");
        } else if (resData.error === "Some other Error occurred") {
          toast.error("Username or Password does not Exist!");
        } else {
          toast.error(resData.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const signupSubmit = (e) => {
    e.preventDefault();

    var axios = require("axios");
    var data = JSON.stringify({
      name: signUpFormValues.name,
      email: signUpFormValues.email,
      phone: signUpFormValues.mobile,
      password: signUpFormValues.password,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let responseData = response.data;
        console.log(responseData);
        if (responseData.success === "True") {
          setResponseData(responseData);
          toast.success("Welcome to Intellimart, please login to continue!");
          setSignUpFormValues(signUpFormInitialValues);
          formToggleHandler();
        } else {
          toast.error(responseData.error);
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
        console.log(error.response.data.error);
      });
  };

  return (
    <div className='login-container'>
      <div className='form'>
        <div className='login-illus'>
          <img src={Illustration} alt='Login/Sign Up' className='login-svg' />
        </div>

        <div className='form-toggle' onClick={() => formToggleHandler()}></div>
        <div className='form-panel one' style={{ cursor: "pointer" }}>
          <div className='form-header'>
            <h1>Account Login</h1>
          </div>
          <div className='form-content'>
            <form className='login-form' onSubmit={loginSubmit}>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  id='username'
                  type='text'
                  name='username'
                  required='required'
                  onChange={handleSignInEmail}
                  value={signInFormValues.email}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  name='password'
                  required='required'
                  onChange={handleSignInPassword}
                  value={signInFormValues.password}
                />
              </div>
              <div className='form-group'>
                {/* <label className="form-remember">
                  <input type="checkbox" />
                  Remember Me
                </label> */}
                {/* <a className="form-recovery">Forgot Password?</a> */}
              </div>
              <div className='form-group'>
                <button type='submit'>Log In</button>
              </div>
            </form>
          </div>
        </div>
        <div className='form-panel two' onClick={() => formPanelTwoHandler()}>
          <div className='form-header'>
            <h1>SIGN IN</h1>
          </div>
          <div className='form-content'>
            <form className='login-form' onSubmit={signupSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  required='required'
                  onChange={handleSignUpName}
                  value={signUpFormValues.name}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  required='required'
                  onChange={handleSignUpEmail}
                  value={signUpFormValues.email}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Phone Number</label>
                <input
                  id='mobile'
                  type='text'
                  name='mobile'
                  required='required'
                  onChange={handleSignUpMobile}
                  value={signUpFormValues.mobile}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  name='password'
                  required='required'
                  onChange={handleSignUpPassword}
                  value={signUpFormValues.password}
                />
              </div>
              <div className='form-group'>
                <button type='submit'>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
