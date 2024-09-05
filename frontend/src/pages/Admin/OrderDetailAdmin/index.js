import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../../Api";
import { formatDate } from "../../../utils/dateFormetter";

function OrderDetailAdmin() {
  const { id } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['admin:orderDetail'],
    queryFn: fetchOrders
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const order = data.find((order) => order._id === id);

  if (!order) return <div>Order not found</div>;

  return (
    <div className="px-2 md:px-4 mt-6">
      <h2 className="text-xl font-medium text-accent text-center mt-5">
        Order Detail
      </h2>
      <div className="mb-12">
        <h2 className="text-md font-medium mb-2 text-accent ">
          User Detail
        </h2>
        <div className="grid md:grid-cols-3 gap-4 pt-2 border-t border-secondary">
          <div className="flex">
            <h3 className="me-4 font-semibold">E-mail : </h3>
            <p > {order.user.email}</p>
          </div>
          <div className="flex">
            <h3 className="me-4 font-semibold">Address : </h3>
            <p> {order.adress}</p>
          </div>
          <div className="flex">
            <h3 className="me-4 font-semibold">Created at : </h3>
            <p>{formatDate(order.createdAt)}</p>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <ul className="grid grid-cols-4 justify-items-center font-normal mb-2">
          <li>Order</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Total</li>
        </ul>
        <div className="border-y border-secondary">
          <ul>
            {order.items.map((item, index) => (
              <li key={index} className="grid grid-cols-4 py-4 font-light">
                <Link to={`/product/${item._id}`} className="grid items-center">
                  <div className="grid md:grid-cols-2 md:gap-4 gap-1 items-center text-center">
                    <img width={150} src={item.photos[0]} alt={item.title} />
                    <h3>{item.title}</h3>
                  </div>
                </Link>
                <div className="grid items-center justify-center">
                  $ {item.price}
                </div>
                <div className="grid justify-center content-center">
                  <span className="text-center">{item.quantity || 1} adet</span>
                </div>
                <div className="grid items-center justify-center">
                  $ {item.price * (item.quantity || 1)}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-end mt-4">
          <h2 className="font-semibold mr-4">Total = $ {order.items.reduce((total, item) => total + item.price * (item.quantity || 1), 0)}</h2>
        </div>
      </div>
    </div>

  );
}

export default OrderDetailAdmin;
