import React from "react";
import "../Navbar/style.css";
import "../Card/style.css";
import { Link } from "react-router-dom";

function Card(props) {
  const { item } = props;

  const date = new Date(item.createdAt);
  const formattedDate = date.toLocaleDateString("tr-TR"); 

  return (
    <Link to={item._id}>
    <div className="card card-compact   bg-base-100 shadow-xl">
      <figure className="product-image">
        <img
          src={item.photos[0]}
          alt={item.title}
          className="main-image"
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h4 className="text-sm text-slate-300">{formattedDate}</h4>
        <h2 className="card-title">{item.title}</h2>
        <div className="grid grid-cols-2 content-center">
          <p className="py-4">{item.price} tl</p>
          <button className="btn btn-primary">Add to basket</button>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Card;
