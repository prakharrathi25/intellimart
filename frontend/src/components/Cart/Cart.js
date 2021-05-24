import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useCart } from "react-use-cart";
import Illustration from '../../assets/empty_cart.svg';

const Cart = () => {
  // const [cartItems, setCartItems] = useState(null);
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  useEffect(() => {
    let cartValue = localStorage.getItem("cart");
    // setCartItems(JSON.parse(cartValue));
    console.log(JSON.parse(cartValue));
  }, []);

  if (isEmpty) return <div className="empty-cart-container"><img className="empty-cart-image" src={Illustration} alt=""/><p className="empty-cart-text">No Current Bookings!</p></div>;

  return (
    <>
      {!isEmpty && <button onClick={emptyCart}>Empty cart</button>}
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
                  <div class="td_item item_qty">
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
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
                <a href="/stores">
                  <span class="material-icons-outlined">west</span>
                  Back to Shop
                </a>
              </div>
              <div class="subtotal">
                <label>Subtotal: </label>
                <strong>&#8377; {cartTotal}</strong>
              </div>
            </div>
          </div>
        </div>
{/* 
        <div class="cart_details">
          <div class="cart_title">Cart Details</div>
          <div class="form_row">
            <div class="form_group cart_type">
              <label class="input_label">Select Card Type</label>

              <input
                type="radio"
                name="cartType"
                required
                id="master"
                checked
              />
              <label class="type master" title="Master" for="master"></label>
              <input type="radio" name="cartType" required id="visa" />
              <label class="type visa" title="Visa" for="visa"></label>
              <input type="radio" name="cartType" required id="paypal" />
              <label class="type paypal" title="PayPal" for="paypal"></label>
            </div>

            <div class="form_group">
              <label class="input_label">Card Number</label>
              <input
                type="text"
                class="input"
                id="card_number"
                name="card"
                min="16"
                max="16"
                placeholder="0000 0000 0000 0000"
                onkeypress="return checkDigit(event)"
                autocomplete="off"
                required
              />
            </div>

            <div class="form_group w_75">
              <label class="input_label">Ecpiry Date</label>
              <input
                type="text"
                class="input"
                id="card_date"
                placeholder="MM / YY"
                onkeypress="return checkDigit(event)"
                autocomplete="off"
                required
              />
            </div>

            <div class="form_group w_25">
              <label class="input_label">CVV</label>
              <input
                type="password"
                class="input"
                min="3"
                max="3"
                placeholder="***"
                onkeypress="return checkDigit(event)"
                autocomplete="off"
                required
              />
            </div>

            <button class="btn">Checkout</button>
          </div>
        </div> */}
      </section> 
    </>
  );
};

export default Cart;
