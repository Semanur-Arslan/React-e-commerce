import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/style.css";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContexts";
import Logo from "../../images/logo.svg";
import { FaUser } from "react-icons/fa6";

function Navbar() {
  const { loggedIn } = useAuth();
  const { basketItems } = useBasket();

  let basketItemCount = 0;
  for (const itemId in basketItems) {
    basketItemCount += basketItems[itemId].quantity;
  }

  return (
    <nav className="grid grid-cols-3 gap-4 items-center py-2 px-8">
      <div className=" flex justify-start ">
        <div className="grid grid-cols-2 items-center">
          <Link to="/" className="flex justify-start items-center">
            <img src={Logo} alt="logo" loading="lazy" />
            <h3 className="text-lg text-primary font-bold pl-2">Candleaf</h3>
          </Link>
        </div>
      </div>
      <div className="flex justify-center  ">
        <ul className="grid grid-cols-3 text-accent text-sm justify-center items-center">
          <li className="flex justify-center px-4">
            <Link to="/product">Products</Link>
          </li>
          <li className="flex justify-center px-4">
            <Link to="/product">About</Link>
          </li>
          <li className="flex justify-center px-4">
            <Link to="/product">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-end ">
        {loggedIn && loggedIn ? (
          <>
            <Link to="/profile">
              <button
                type="button"
                className="btn btn-neutral rounded-lg text-slate-50"
              >
                Profile
              </button>
            </Link>

            {basketItemCount > 0 && (
              <Link to="/basket">
                <button
                  type="button"
                  className="btn btn-neutral rounded-lg text-slate-50"
                >
                  Basket ({basketItemCount})
                </button>
              </Link>
            )}
          </>
        ) : (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center my-hover"
              >
                <FaUser className="pl-1 " />
                <span className="pl-1">Sign In</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1]  shadow bg-base-100 rounded w-36"
              >
                <li className=" text-primary hover:bg-primary hover:text-info  focus:bg-primary focus:text-info  p-2 rounded-t text-sm">
                  <Link to="/profile">Sign In</Link>
                </li>
                <li className="text-primary hover:bg-primary  hover:text-info  focus:bg-primary focus:text-info p-2 rounded-b text-sm">
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
