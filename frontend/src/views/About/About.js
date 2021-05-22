import React, { useEffect, useState } from "react";
import "./About.css";

const About = () => {
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    let cartValue = localStorage.getItem("cart");
    setCartItems(cartValue);
    console.log(JSON.parse(cartValue));
  }, []);

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-main">
          <h1>A way to shop during quarantine </h1>
          <p>
            We want to reduce people’s exposure to the COVID-19 by letting
            people know whether the items they’re looking for are available in
            their nearest supermarket.
          </p>
        </div>
        <div className="about-form">
          {/* HEY WE ARE HEY WE ARE HEY WE ARE HEY WE ARE HEY WE ARE HEY WE ARE
            HEY WE ARE HEY WE  */}
          <iframe
            src="https://covidhelp.typeform.com/to/yumxab"
            class="sm:rounded-lg absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
