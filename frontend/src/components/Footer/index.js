import React from 'react';
import "../Footer/style.css";
import logoFooter from "../../images/logo-footer.svg";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='bg-accent mt-12 py-12 px-12'>
  <div className='grid grid-cols-2 gap-4 items-center my-border-line pb-6'>
  <div className="flex flex-col justify-start ">
  <div className="grid grid-cols-2 items-center">
          <Link to="/" className="flex justify-start items-center">
          <img src={logoFooter} alt="logoFooter" />
            <h3 className="text-lg text-primary font-bold pl-2">Candleaf</h3>
          </Link>
        </div>

        </div>
        <div className="flex justify-end ">
       sdfghjkl
        </div>
  </div>
    </footer>
  )
}

export default Footer