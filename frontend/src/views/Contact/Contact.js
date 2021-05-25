import React, { useState } from "react";
import "./Contact.css";
import Loader from '../../components/loader';

const Contact = () => {
  

  return (
    <div className="about-container">
      
      
          <h1>A way to shop during quarantine </h1>
          <p>
            We want to reduce people’s exposure to the COVID-19 by letting
            people know whether the items they’re looking for are available in
            their nearest supermarket.
          </p>
        
        <div className="about-form">
          <iframe
            src="https://covidhelp.typeform.com/to/yumxab"
            class="sm:rounded-lg absolute inset-0 w-full h-full"
            frameBorder="0"
          ></iframe>
          </div>
        
      
    </div>
  );
};

export default Contact;
