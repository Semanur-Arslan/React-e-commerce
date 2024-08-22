import React, { useState } from "react";
import "../Navbar/style.css";
import "../Card/style.css";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContexts";
import { useAuth } from "../../contexts/AuthContext";

function Card(props) {
  const { item } = props;
  const { addToBasket, removeFromBasket, basketItems } = useBasket();
  const { user } = useAuth();

  const product = basketItems[item._id];
  const quantity = product ? product.quantity : 0;

  const handleAddToBasket = () => {
    addToBasket(item);
  };

  const handleIncreaseQuantity = () => {
    addToBasket(item);
  };

  const handleDecreaseQuantity = () => {
    removeFromBasket(item);
  };

  return (
    <div className="card card-compact shadow-md rounded">
      <Link to={`/product/${item._id}`}>
        <figure className="product-image rounded-t">
          <img
            src={item.photos[0]}
            alt={item.title}
            className="main-image"
            loading="lazy"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/product/${item._id}`}>
          <h2 className="card-title text-sm">{item.title}</h2>
        </Link>

        <div className="grid grid-cols-2  content-center flex items-center">
          <p className="py-4 text-md">{item.price} $</p>
          {user?.role !== 'admin' && (
            quantity === 0 ? (
              <button className="btn btn-outline btn-primary btn-sm hover:text-white " onClick={handleAddToBasket}>
                Add to cart
              </button>
            ) : (
              <div className="grid grid-cols-3  border border-primary rounded-md text-primary ml-auto w-1/2">
                <button onClick={handleDecreaseQuantity}>-</button>
                <span className="text-center text-base">{quantity}</span>
                <button onClick={handleIncreaseQuantity}>+</button>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default Card;
