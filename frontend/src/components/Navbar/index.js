import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/style.css";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContexts";
import Logo from "../../images/logo.svg";
import { FaUser } from "react-icons/fa6";
import { BsFillBasket2Fill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const { loggedIn } = useAuth();
  const { basketItems } = useBasket();

  let basketItemCount = 0;
  for (const itemId in basketItems) {
    basketItemCount += basketItems[itemId].quantity;
  }

  document.getElementById("hamburger").onclick = function toggleMenu() {
    const navToggle = document.getElementsByClassName("my-toggle");
    for (let i = 0; i < navToggle.length; i++) {
      navToggle.item(i).classList.toggle("hidden");
    }
  };

  return (
    <nav className="grid grid-cols-3 gap-4 items-center py-2 md:px-8 px-4">
      <div class="flex md:hidden">
        <button id="hamburger">
          <RxHamburgerMenu />
        </button>
      </div>
      <div className=" md:flex justify-start ">
        <div className="grid grid-cols-2 items-center">
          <Link to="/" className="flex justify-start items-center">
            <img
              src={Logo}
              alt="logo"
              loading="lazy"
              className="h-6 md:h-auto"
            />
            <h3 className="md:text-lg text-sm  text-primary font-bold pl-2">
              Candleaf
            </h3>
          </Link>
        </div>
      </div>
      <div className="md:flex md:justify-center order-4 md:order-2  my-toggle  hidden w-full">
        <ul className="md:grid grid-cols-3 text-accent text-sm justify-center items-center">
          <li className="md:flex justify-center px-4">
            <Link to="/product">Products</Link>
          </li>
          <li className="md:flex justify-center px-4">
            <Link to="/product">About</Link>
          </li>
          <li className="md:flex justify-center px-4">
            <Link to="/product">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-end order-3 ">
        {loggedIn && loggedIn ? (
          <>
            <div className="my-hover-div flex items-center">
              <Link to="/profile">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center my-hover"
                >
                  <FaUser className="pl-1 " />
                  <span className="pl-1 md:text-base text-xs hidden md:block">
                    {" "}
                    Profile
                  </span>
                </div>
              </Link>
            </div>

            <div className="ml-4 my-basket">
              {basketItemCount > 0 && (
                <Link
                  to="/basket"
                  className="flex items-center my-basket-piece"
                >
                  <BsFillBasket2Fill className="mr-1 " />
                  <span className="mb-2  md:text-sm text-xs   ">
                    ({basketItemCount})
                  </span>
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <div className="dropdown dropdown-end">
                <div className="my-hover-div">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center my-hover"
                  >
                    <FaUser className="pl-1 " />
                    <span className="pl-1 md:text-base text-xs hidden md:block">
                      Sign In
                    </span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1]  shadow bg-base-100 rounded w-24 md:w-36 "
                  >
                    <Link to="/profile">
                      <li className=" text-primary hover:bg-primary hover:text-info  focus:bg-primary focus:text-info  p-2 rounded-t text-xs md:text-sm">
                        Sign In
                      </li>
                    </Link>
                    <Link to="/signup">
                      <li className="text-primary hover:bg-primary  hover:text-info  focus:bg-primary focus:text-info p-2 rounded-b text-xs md:text-sm">
                        Sign Up
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="ml-4 my-basket">
                {basketItemCount > 0 && (
                  <Link
                    to="/basket"
                    className="flex items-center my-basket-piece"
                  >
                    <BsFillBasket2Fill className="mr-1 " />
                    <span className="mb-2 md:text-sm text-xs  ">
                      ({basketItemCount})
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
