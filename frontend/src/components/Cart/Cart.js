import React, { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    let cartValue = localStorage.getItem("cart");
    setCartItems(cartValue);
    console.log(JSON.parse(cartValue));
  }, []);

  return (
    <div>
      <div>
        <p>
            {
                cartItems ? cartItems : "No Items in Cart"
            }
        </p>
      </div>
    </div>
  );
};

export default Cart;
