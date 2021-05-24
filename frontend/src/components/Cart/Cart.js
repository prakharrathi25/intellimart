import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useCart } from "react-use-cart";
import Illustration from "../../assets/empty_cart.svg";
import axios from "axios";

const Cart = () => {
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    addItem,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const [existingUserCart, setExistingUserCart] = useState(null);

  // FETCHING Cart Data Using DB Fetch (ONLY IF LOGIN HAS HAPPENED)
  useEffect(() => {
    if (!localStorage.getItem("login")) {
      return;
    }
    let userID = JSON.parse(localStorage.getItem("login")).user_id;
    console.log(userID);

    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/cartprod?user=" + userID + "&ordered=False",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setExistingUserCart(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Fetching Product Data from Cart Data and adding into current cart
  useEffect(() => {
    !existingUserCart
      ? console.log("xistingUserCart.length is 0 hehehe")
      : existingUserCart.map((existingCartItem, key) => {
          console.log(existingCartItem);
          // console.log(existingCartItem.product_details);
          // console.log(existingCartItem.store_details);
          addItem(
            {
              name: existingCartItem.product_details.name,
              // "quantity": existingCartItem.quantity,
              price: existingCartItem.price,
              id: existingCartItem.product,
              storeName: existingCartItem.product_details.store_details.name,
              user: existingCartItem.user,
              image: existingCartItem.product_details.image,
            },
            existingCartItem.quantity
          );
        });
  }, [existingUserCart]);

  // }

  // Submit Data
  const submitOrder = () => {
    console.log("SUBMIT ORDER");
  };

  // Display Logic
  if (isEmpty)
    return (
      <div className="empty-cart-container">
        <img className="empty-cart-image" src={Illustration} alt="" />
        <p className="empty-cart-text">No Current Bookings!</p>
      </div>
    );

  return (
    <div className="cart-container">
      <section class="cart_wrapper">
        <div class="cart_lists">
          <div class="cart_title">
            <span class="material-icons-outlined">local_mall</span>
            Your Shopping Cart
          </div>

          <div class="cart_list_wrap">
            <div class="cart_responsive">
              {items.map((item) => (
                <div class="tr_item">
                  <div class="td_item item_img">
                    <img src={"http://127.0.0.1:8000" + item.image} />
                  </div>
                  <div class="td_item item_name">
                    <label class="main">{item.name}</label>
                    <label class="sub">Store: {item.storeName}</label>
                  </div>
                  <div class="td_item item_color">
                    <label>x &nbsp;{item.quantity}</label>
                  </div>
                  <div class="td_item">
                    <div className="item_qty">
                    <button
                    className="qty-button"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <button
                    className="qty-button"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      
                      +
                    </button>
                    </div>
                  </div>
                  <div class="td_item item_price">
                    <label>&#8377; {item.price}</label>
                  </div>
                  <div class="td_item item_remove">
                    <span
                      onClick={() => removeItem(item.id)}
                      class="material-icons-outlined"
                    >
                      close
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div class="footer">
              <div class="back_cart">
                {/* <a href="/stores">
                  <span class="material-icons-outlined">west</span>
                  Back to Shop
                </a> */}
                {!isEmpty && <button onClick={emptyCart} className="empty-cart button">Empty cart</button>}
              </div>
              {/* <div>
                {!isEmpty && <button onClick={emptyCart}>Empty cart</button>}
              </div> */}
              <div class="subtotal">
                <label>Subtotal: </label>
                <strong>&#8377; {cartTotal}</strong>
              </div>

              <div className="submit-div">
                <button onClick={()=>submitOrder()} className="submit button"> SUBMIT ORDER </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
