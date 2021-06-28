import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useCart } from "react-use-cart";
import Illustration from "../../assets/empty_cart.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
// import useWindowSize from 'react-use/lib/useWindowSize';
// import Confetti from "react-confetti";

const Cart = () => {
  const history = useHistory();
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    addItem,
    updateItemQuantity,
    removeItem,
    emptyCart,
    getItem,
    inCart,
  } = useCart();
  const isLoggedIn =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login")).user_id
      ? true
      : false;

  // Checking Login Status on every reload to redirect
  useEffect(() => {
    if (localStorage.getItem("login")) {
      return;
    } else {
      toast.error("Please Login to Continue");
      history.push("/login");
    }
  }, []);

  // FETCHING Cart Data Using DB Fetch (ONLY IF LOGIN HAS HAPPENED)
  useEffect(() => {
    if (!localStorage.getItem("login")) {
      return;
    }
    let userID = JSON.parse(localStorage.getItem("login")).user_id;
    // console.log(userID);

    var config = {
      method: "get",
      url: "/cartprod?user=" + userID + "&ordered=False",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        let existingUserCart = response.data;
        // console.log(existingUserCart);

        existingUserCart.length == 0
          ? console.log("ExistingUserCart.length is 0 hehehe")
          : existingUserCart.map((existingUserCartItem, key) => {
              inCart(existingUserCartItem.product) // Check if the item already in cart in DB has been in the current cart to append or cancel
                ? console.log()
                : addItem(
                    {
                      name: existingUserCartItem.product_details.name,
                      // "quantity": existingCartItem.quantity,
                      price: existingUserCartItem.price,
                      id: existingUserCartItem.product,
                      storeName:
                        existingUserCartItem.product_details.store_details.name,
                      user: existingUserCartItem.user,
                      image: existingUserCartItem.product_details.image,
                      existingCartID: existingUserCartItem.id,
                    },
                    existingUserCartItem.quantity
                  );
            });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Function to Update the Cart to backend on every cart module updation
  const postItems = () => {
    // console.log(items);

    items.map((item) => {
      // console.log(item);
      var data = JSON.stringify({
        quantity: item.quantity,
        price: item.price,
        ordered: false,
        product: item.id,
        user: JSON.parse(localStorage.getItem("login")).user_id,
      });

      var config = {
        method: "post",
        url: "/cartprod",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
          // console.log(error.response);
          console.log(error.response.data.error);
          toast.error(
            "Quantity of " + item.name + " added is more than amount available"
          );
          updateItemQuantity(item.id, item.quantity - 1);
        });
    });
  };

  // Function Getting Triggered on Every change in the Cart
  useEffect(() => {
    // console.log(items);
    items.length > 0 && isLoggedIn && postItems();
  }, [items]);

  // Empty the cart and update backend
  const emptyCartHandler = () => {
    items.map((item) => {
      // console.log(item);
      var data = JSON.stringify({
        quantity: 0,
        price: item.price,
        ordered: false,
        product: item.id,
        user: JSON.parse(localStorage.getItem("login")).user_id,
      });

      var config = {
        method: "post",
        url: "/cartprod",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    emptyCart();
  };

  // Remove an item and update backend
  const removeItemHandler = (id) => {
    // console.log(getItem(id));
    let item = getItem(id);

    var data = JSON.stringify({
      quantity: 0,
      price: item.price,
      ordered: false,
      product: item.id,
      user: JSON.parse(localStorage.getItem("login")).user_id,
    });

    var config = {
      method: "post",
      url: "/cartprod",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    removeItem(id);
  };

  // Submit Button Function
  const submitOrder = () => {
    // console.log("SUBMIT ORDER");
    emptyCartHandler();
    toast.success("ORDER PLACED!!!!!!!!!!!");
    // toggleConfetti();
    history.push("/");
  };

  if (isEmpty)
    return (
      <div className='empty-cart-container'>
        <img className='empty-cart-image' src={Illustration} alt='' />
        <p className='empty-cart-text'>No Current Bookings!</p>
      </div>
    );

  return (
    <div className='cart-container'>
      <section className='cart_wrapper'>
        <div className='cart_lists'>
          <div className='cart_title'>
            <span className='material-icons-outlined'>local_mall</span>
            Your Shopping Cart
          </div>

          <div className='cart_list_wrap'>
            <div className='cart_responsive'>
              {items.map((item) => (
                <div className='tr_item'>
                  <div className='td_item item_img'>
                    <img src={"http://127.0.0.1:8000" + item.image} />
                  </div>
                  <div className='td_item item_name'>
                    <label className='main'>{item.name}</label>
                    <label className='sub'>Store: {item.storeName}</label>
                  </div>
                  <div className='td_item item_color'>
                    <label>x &nbsp;{item.quantity}</label>
                  </div>
                  <div className='td_item'>
                    <div className='item_qty'>
                      <button
                        className='qty-button'
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <button
                        className='qty-button'
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className='td_item item_price'>
                    <label>&#8377; {item.price}</label>
                  </div>
                  <div className='td_item item_remove'>
                    <span
                      onClick={() => removeItemHandler(item.id)}
                      className='material-icons-outlined'
                    >
                      close
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className='footer'>
              <div className='back_cart'>
                {/* <a href="/stores">
                  <span className="material-icons-outlined">west</span>
                  Back to Shop
                </a> */}
                {!isEmpty && (
                  <button
                    onClick={() => emptyCartHandler()}
                    className='empty-cart button'
                  >
                    Empty cart
                  </button>
                )}
              </div>

              <div className='subtotal'>
                <label>Subtotal: </label>
                <strong>&#8377; {cartTotal}</strong>
              </div>
              <div className='slot-container'>
                <p className='slot-heading'>Select Your Slot</p>

                {/* <div className="slot-storename">City Medicos</div> */}
                <form action='/p/quote.php'>
                  {/* add slots for visual display in data-debt-amount attributee */}

                  <div id='debt-amount-slider'>
                    <input
                      type='radio'
                      name='debt-amount'
                      id='1'
                      value='1'
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                      required
                    />
                    <label htmlFor='1' data-debt-amount='12-2 PM'></label>
                    <input
                      type='radio'
                      name='debt-amount'
                      id='2'
                      value='2'
                      required
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                    <label htmlFor='2' data-debt-amount='2-4 PM'></label>
                    <input
                      type='radio'
                      name='debt-amount'
                      id='3'
                      value='3'
                      required
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                    <label htmlFor='3' data-debt-amount='4-6 PM'></label>
                    <input
                      type='radio'
                      name='debt-amount'
                      id='4'
                      value='4'
                      required
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                    <label htmlFor='4' data-debt-amount='6-8 PM'></label>
                    <input
                      type='radio'
                      name='debt-amount'
                      id='5'
                      value='5'
                      required
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                    <label htmlFor='5' data-debt-amount='8-10 PM'></label>
                    <div id='debt-amount-pos'></div>
                  </div>
                </form>
              </div>
              <div className='submit-div'>
                <button onClick={() => submitOrder()} className='submit button'>
                  {" "}
                  SUBMIT ORDER{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {confettiVisible ? ( */}
      {/* <Confetti
          onConfettiComplete={toggleConfetti()}
          width={1920}
          height={1080}
        /> */}
      {/* ) : null} */}
    </div>
  );
};

export default Cart;
