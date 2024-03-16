import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/style.module.css";

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
        </ul>
    </div>
    <div className="right-nav">right</div>

  </nav>
  )

}

export default Navbar;
