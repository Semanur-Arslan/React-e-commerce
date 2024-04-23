import React from "react";
import { useBasket } from "../../contexts/BasketContexts";
import { Link } from "react-router-dom";

function Basket() {
  const { basketItems, addToBasket, removeFromBasket } = useBasket();

  const basketItemsArray = Object.keys(basketItems).map((itemId) => ({
    id: itemId,
    ...basketItems[itemId], // Sepete eklenen ürünün tüm bilgilerini al
  }));

  const totalBasketPrice = basketItemsArray.reduce((total, basketItem) => {
    return total + basketItem.price * basketItem.quantity;
  }, 0);

  const handleIncreaseQuantity = (itemId) => {
    addToBasket(basketItems[itemId]); // Ürünün adetini bir arttır
  };

  const handleDecreaseQuantity = (itemId) => {
    removeFromBasket(basketItems[itemId]); // Ürünün adetini bir azalt
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

          <div className="flex items-center justify-end  mt-4">
            <h2 className="font-semibold mr-4">Total = $ {totalBasketPrice}</h2>
            <button className="btn btn-primary btn-sm text-white ">
              Check-out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Basket;
