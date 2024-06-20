import React from "react";
import { Link, Outlet } from "react-router-dom";


function Admin() {
  return (
    <div className=" px-2 md:px-32 mt-4">
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box ">
        <li >
          <Link to='/admin'  className="hover:bg-primary">Home</Link>
        </li>
        <li>
          <Link to='/admin/products'  className="hover:bg-primary">Products</Link>
        </li>
        <li>
          <Link to='/admin/orders'  className="hover:bg-primary">Orders</Link>
        </li>
      </ul>
      <Outlet /> 
    </div>
  );
}

export default Admin;
