import React from 'react';
import { fetchOrders } from '../../../Api';
import { useQuery } from "@tanstack/react-query";

function OrdersAdmin() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['admin:orders'],
    queryFn: fetchOrders
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error {error.message}</div>;
console.log(data)
  return (
    <div>
      <div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th>User</th>
        <th>Address</th>
        <th>Items</th>
      </tr>
    </thead>
    <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.user.email}</td>
                <td>{item.adress}</td>
                <td>{item.items.length}</td>
              </tr>
            ))}
          </tbody>
  </table>
</div>
    </div>
  )
}

export default OrdersAdmin;
