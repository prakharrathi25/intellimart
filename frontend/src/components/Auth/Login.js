import React from "react";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const loginSubmit = (e) => {
  e.preventDefault();
  console.log("loginSubmit");
  toast.success("Padhaaro Sa");
};

const signupSubmit = (e) => {
  e.preventDefault();
  console.log("signupSubmit");
  toast.error("You Can't Sit With Us");
};

const Login = () => {
  return (
    <div className="login-container">
      <div className="form">
        <div className="form-toggle" onClick={() => formToggleHandler()}></div>
        <div className="form-panel one" style={{ cursor: "pointer" }}>
          <div className="form-header">
            <h1>Account Login</h1>
          </div>
          <div className="form-content">
            <form onSubmit={loginSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  required="required"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
                />
              </div>
              <div className="form-group">
                <label className="form-remember">
                  <input type="checkbox" />
                  Remember Me
                </label>
                <a className="form-recovery">Forgot Password?</a>
              </div>
              <div className="form-group">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
        <div className="form-panel two" onClick={() => formPanelTwoHandler()}>
          <div className="form-header">
            <h1>Register Account</h1>
          </div>
          <div className="form-content">
            <form onSubmit={signupSubmit}>
              {/* <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  required="required"
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required="required"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  required="required"
                />
              </div>
              <div className="form-group">
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
