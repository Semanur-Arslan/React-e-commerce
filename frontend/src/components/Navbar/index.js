import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Navbar/style.css";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContexts";
import Logo from "../../images/logo.svg";
import { FaUser } from "react-icons/fa6";
import { BsFillBasket2Fill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { basketItems } = useBasket();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  let basketItemCount = 0;
  for (const itemId in basketItems) {
    basketItemCount += basketItems[itemId].quantity;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="grid grid-cols-3 gap-4 items-center py-2 md:px-8 px-4">
      <div className="flex md:hidden">
        <button id="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <span>X</span> : <RxHamburgerMenu />}
        </button>
      </div>
      <div className="md:flex justify-start">
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
      <div ref={menuRef} className={`md:flex md:justify-center order-4 md:order-2 my-toggle md:transition-none transform transition-transform ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}  md:translate-x-2  md:relative md:top-0 left-0  absolute top-9 z-10 bg-base-100 md:px-0 px-4 py-3 w-1/2 md:w-auto h-screen md:h-auto`}>
        <ul className="md:grid grid-cols-3 text-accent text-sm justify-center items-center ">
          <li className="md:flex justify-center px-1 md:px-4 md:p-0 py-1 border-solid border-b border-primary md:border-none">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li className="md:flex justify-center px-1 md:px-4 md:p-0 py-1 border-solid border-b border-primary md:border-none">
            <Link to="/product" onClick={() => setMenuOpen(false)}>Products</Link>
          </li>
          <li className="md:flex justify-center px-1 md:px-4 md:p-0 py-1 border-solid border-b border-primary md:border-none">
            <Link to="/product" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-end order-3 ">
        {loggedIn && loggedIn ? (
          <>
            {user?.role === 'admin' && (
              <div className="my-hover-div flex items-center">
                <Link to="/admin/products">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center my-hover me-2"
                  >
                    <span className="pl-1 md:text-base text-xs">
                      {" "}
                      Admin
                    </span>
                  </div>
                </Link>
              </div>
            )}
            <div className="my-hover-div flex items-center">
              <Link to="/profile">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center my-hover"
                >
                  <FaUser className="pl-1 " />
                  <span className="pl-1 md:text-base text-xs ">
                    {" "}
                    Profile
                  </span>
                </div>
              </Link>
            </div>
            {user?.role === 'user' && (
              <div className="ml-4 my-basket">
                <Link
                  to="/basket"
                  className="flex items-center my-basket-piece"
                >
                  <BsFillBasket2Fill className="mr-1 " />
                  <span className="mb-2  md:text-sm text-xs">
                    ({basketItemCount})
                  </span>
                </Link>
              </div>
            )}
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
                <Link
                  to="/basket"
                  className="flex items-center my-basket-piece"
                >
                  <BsFillBasket2Fill className="mr-1 " />
                  <span className="mb-2 md:text-sm text-xs  ">
                    ({basketItemCount})
                  </span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
