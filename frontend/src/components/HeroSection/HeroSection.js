import React, { useEffect } from "react";
import "./HeroSection.css";
// import Navbar from '../Navbar/Navbar';
import Illustration from "../HeroSection/hero_illustration.gif";
import Waves from "../Waves/Waves";
import Typist from 'react-text-typist';
import { Link } from "react-router-dom";

const HeroSection = () => {

  return (
    <div>
      <div className="hero-container">
        {/* <div class="custom-shape-divider-bottom-1621667290">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</div> */}
        <Waves />
        <div className="hero-section">
          <Typist className="hero-heading" sentences={['Big Bazaar?', 'Raj Mandir?', 'Easy Day?', 'IntelliMart.']} cursorColor="#ff0055"loop={false}/>
          <h1 className="hero-heading subheading-txt">
            Check availability of your closest shops and pharmacies.
          </h1>
          <Link to="/stores">
          <button className="hero-button"><p>Start Browsing!</p></button>
          </Link>
        </div>
        <div className="hero-section">
          <img className="hero-img" src={Illustration}></img>
        </div>
      </div>
      <div className="hero-container">
        <h2 className="working-hdng">A safer way to shop amidst lockdowns.</h2>
        <span className="working-txt"><strong className="working-brand-txt">Intellimart</strong> aims to reduce people’s exposure to the COVID-19 by letting everyone know whether the items they’re looking for are available in their nearest supermarket or not.

</span>
      </div>
    </div>
  );
};

export default HeroSection;
