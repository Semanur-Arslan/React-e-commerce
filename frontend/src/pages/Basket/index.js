import React from "react";
import { useBasket } from "../../contexts/BasketContexts";
import { Link } from "react-router-dom";
import { postOrder } from "../../Api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Basket() {
  const navigate = useNavigate();
  const { basketItems, addToBasket, removeFromBasket, emptyBasket } =
    useBasket();
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const basketItemsArray = Object.keys(basketItems).map((itemId) => ({
    id: itemId,
    ...basketItems[itemId],
  }));

  const totalBasketPrice = basketItemsArray.reduce((total, basketItem) => {
    return total + basketItem.price * basketItem.quantity;
  }, 0);

  const handleIncreaseQuantity = (itemId) => {
    addToBasket(basketItems[itemId]);
  };

  const handleDecreaseQuantity = (itemId) => {
    removeFromBasket(basketItems[itemId]);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const itemsId = Object.keys(basketItems).map((item) => item);

    const input = {
      address,
      items: JSON.stringify(itemsId),
    };

    try {
      await postOrder(input);
      emptyBasket();
      setOrderConfirmed(true);
      setShowModal(false);
      setLoginRequired(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setShowModal(false);
        setLoginRequired(true);
      } else if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
        setTimeout(() => setErrorMessage(""), 5000);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div className=" px-2 md:px-32 mt-6">
      <h2 className="text-xl font-medium mb-4 text-accent text-center mt-5">
        Your cart items
      </h2>
      <Link to="/product">
        <p className="text-xs mb-8 text-primary text-center underline underline-offset-1">
          Back to shopping
        </p>
      </Link>

      {orderConfirmed && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your purchase has been confirmed!</span>
        </div>
      )}
      {basketItemsArray.length < 1 ? (
        <p className="text-center mt-8">There are no items in your cart</p>
      ) : (
        <>
          <ul className="grid grid-cols-4 justify-items-center font-normal mb-2">
            <li>Product</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Total</li>
          </ul>
          <div className="border-y border-secondary">
            <ul>
              {basketItemsArray.map((basketItem) => (
                <li
                  key={basketItem.id}
                  className="grid grid-cols-4  py-4 font-light"
                >
                  <Link to={`/${basketItem._id}`} className="grid items-center">
                    <div className="grid md:grid-cols-2 md:gap-4 gap-1 items-center text-center">
                      <img
                        width={150}
                        src={basketItem.photos[0]}
                        alt={basketItem.title}
                      />
                      <h3>{basketItem.title}</h3>
                    </div>
                  </Link>

                  <div className="grid items-center justify-center">
                    {" "}
                    $ {basketItem.price}
                  </div>

                  <div className="grid justify-center content-center ">
                    <div className="grid grid-cols-3 border border-primary rounded-md text-primary w-24 ">
                      <button
                        onClick={() => handleDecreaseQuantity(basketItem.id)}
                      >
                        -
                      </button>
                      <span className="text-center ">
                        {basketItem.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(basketItem.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid items-center justify-center">
                    {" "}
                    $ {basketItem.price * basketItem.quantity}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end  my-8">
            <h2 className="font-semibold mr-4">Total = $ {totalBasketPrice}</h2>
            <button
              className="btn btn-primary btn-sm text-white"
              onClick={() => setShowModal(true)}
            >
              Check-out
            </button>
          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div
                className="modal-overlay absolute inset-0 bg-black opacity-50"
                onClick={() => setShowModal(false)}
              ></div>
              <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                  <div className="flex justify-end items-center pb-3">
                    <button
                      className="btn btn-sm btn-circle btn-ghost"
                      onClick={() => setShowModal(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <h3 className="font-bold text-lg mb-5 text-accent">
                    Complete Your Order
                  </h3>

                  <textarea
                    id="address"
                    placeholder="Address"
                    className="textarea textarea-bordered textarea-lg w-full shadow-sm bg-gray-50 text-gray-900"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>

                  {errorMessage && (
                    <div role="alert" className="alert alert-error">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-end mt-4">
                    <button
                      className="btn btn-primary btn-sm text-white"
                      onClick={handleSubmitForm}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loginRequired && (
            <div role="alert" className="alert alert-warning my-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Please log in to complete your purchase.</span>
              <p
                className="underline underline-offset-1 cursor-pointer"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Basket;
