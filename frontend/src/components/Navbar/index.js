import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/style.css";

function Navbar() {
  return (
    <nav>
      <div className="left-nav">
        <div className="logo">
          <Link to="/">E-COMMERCE</Link>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className="right-nav">
        <Link to="/signin">
          <button
            type="button"
            className="btn btn-neutral rounded-lg text-slate-50"
          >
            Sign in
          </button>
        </Link>
        <Link to="/signup">
          <button
            type="button"
            className="btn btn-outline rounded-lg text-neutral hover:bg-neutral border-neutral hover:border-neutral"
          >
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
