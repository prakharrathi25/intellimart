import React from "react";
import './HeroSection.css'
import Navbar from '../Navbar/Navbar';
import Illustration from "../HeroSection/hero_illustration.gif";

const HeroSection = () => {
  return (
    <div>
      <Navbar/>
    <div className="hero-container">
      <div className="hero-section">
        <h1 className="hero-heading"> Check the availability of your closest shops and pharmacies. (TBD)</h1>
      </div>
      <div className="hero-section">
        <img src={Illustration}></img>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
