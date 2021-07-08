import React from "react";
import "./HeroSection.css";
import Illustration from "../HeroSection/hero_illustration.gif";
import Waves from "../Waves/Waves";
import Typist from "react-text-typist";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div>
      <div className='hero-container'>
        <Waves />
        <div className='hero-section'>
          <Typist
            className='hero-heading'
            sentences={[
              "Big Bazaar?",
              "Raj Mandir?",
              "Easy Day?",
              "IntelliMart.",
            ]}
            cursorColor='#ff0055'
            loop={false}
          />
          <h1 className='hero-heading subheading-txt'>
            Check availability of your closest shops and pharmacies.
          </h1>
          <Link to='/stores'>
            <button className='hero-button'>
              <p>Start Browsing!</p>
            </button>
          </Link>
        </div>
        <div className='hero-section'>
          <img
            className='hero-img'
            src={Illustration}
            alt='hero illustration'
          />
        </div>
      </div>
      {/* <div className="hero-container">
        <h2 className="working-hdng">A safer way to shop amidst lockdowns.</h2>
        <span className="working-txt">
          <strong className="working-brand-txt">Intellimart</strong> aims to
          reduce people’s exposure to the COVID-19 by letting everyone know
          whether the items they’re looking for are available in their nearest
          supermarket or not.
        </span>
      </div> */}
    </div>
  );
};

export default HeroSection;
