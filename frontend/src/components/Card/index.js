import React, { useState } from "react";
import "../Navbar/style.css";
import "../Card/style.css";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContexts";

function Card(props) {
  const { item } = props;
  const { addToBasket, removeFromBasket, basketItems } = useBasket();

  const product = basketItems[item._id];
  const quantity = product ? product.quantity : 0;

  const date = new Date(item.createdAt);
  const formattedDate = date.toLocaleDateString("tr-TR");

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
      <Link to={item._id}>
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
        <Link to={item._id}>
          <h2 className="card-title text-sm">{item.title}</h2>
        </Link>
        <div className="grid grid-cols-2 content-center flex items-center">
          <p className="py-4 text-md">{item.price} $</p>
          {quantity === 0 ? (
            <button className="btn btn-outline btn-primary btn-xs hover:text-white " onClick={handleAddToBasket}>
              Sepete Ekle
            </button>
          ) : (
            <div className="quantity-controls">
              <button onClick={handleDecreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
