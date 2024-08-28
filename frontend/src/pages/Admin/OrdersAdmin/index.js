import React from 'react';
import { fetchOrders } from '../../../Api';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

function OrdersAdmin() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['admin:orders'],
    queryFn: fetchOrders
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error {error.message}</div>;

  return (
    <div>
      <div className="overflow-x-auto mb-8">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Address</th>
              <th>Product Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.user.email}</td>
                <td>{item.adress}</td>
                <td>{item.items.length}</td>
                <td>
                  <Link to={`${item._id}`}><button class="btn btn-outline btn-success btn-xs">Detail</button></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersAdmin;
