import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";


function Admin() {

  const location = useLocation();
  return (
    <div className="bg-info min-h-80">
      <div className=" px-2 md:px-32 mt-4">
        <ul className="menu menu-horizontal bg-base-200 rounded-box ">
          <li >
            <NavLink
              to='/admin/home'
              className={` ${location.pathname === '/admin/home' ? 'bg-primary' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/products'
              className={` ${location.pathname === '/admin/products' ? 'bg-primary' : ''}`}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/orders'
              className={` ${location.pathname === '/admin/orders' ? 'bg-primary' : ''}`}
            >
              Orders
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
