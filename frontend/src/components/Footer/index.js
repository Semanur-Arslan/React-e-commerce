import React from "react";
import "../Footer/style.css";
import logoFooter from "../../images/logo-footer.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
    <footer className="bg-accent mt-12 py-12 px-12">
      <div className="grid grid-cols-2 gap-4 items-center my-border-line pb-6">
        <div className="flex flex-col justify-start ">
          <div className="grid grid-cols-2 items-center">
            <Link to="/" className="flex justify-start items-center">
              <img src={logoFooter} alt="logoFooter" />
              <h3 className="text-3xl text-white font-bold pl-2">Candleaf</h3>
            </Link>
          </div>
          <p className="text-md text-white mt-4">
            Your natural candle made for your home and for your wellness.
          </p>
        </div>
        <div className="flex justify-end ">
          <div className="pr-12">
            <ul className="text-white  text-md mt-4 mb-8">
              <li className="py-2 hover:text-primary">
                <Link to={"/product"}>Product</Link>
              </li>
              <li className="py-2 hover:text-primary">
                <Link to={"/about"}>About</Link>
              </li>

              <li className="py-2 hover:text-primary">
                <Link to={"/contact-us"}>Contact Us</Link>
              </li>
              <li className="py-2 "></li>
            </ul>
          </div>
          <div>
            <ul className="text-white  text-md mt-4 mb-8">

              <li className="py-2 hover:text-primary">
                <Link to={"/"}>Privacy Policies</Link>
              </li>

              <li className="py-2 hover:text-primary">
                <Link to={"/"}>Terms & Conditions</Link>
              </li>
              <li className="py-2 "></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    <div className="text-center bg-info text-xs p-2">
      <p>©Candleaf All Rights Reserved.</p>
    </div>
    </>
  );
}

export default Footer;
