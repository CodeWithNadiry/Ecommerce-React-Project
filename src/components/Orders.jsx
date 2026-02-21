import { useNavigate } from "react-router-dom";
import useOrderStore from "../store/OrderStore";
import useAuthStore from "../store/AuthStore";
import Button from "./ui/Button";
import { formatter } from "../utils/formatter";

const Orders = ({ orders: propOrders, heading = "My Orders", btnText }) => {
  const navigate = useNavigate();
  const { orders: storeOrders, updateOrder } = useOrderStore();
  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin";

  let orders = propOrders || storeOrders;

  if (!isAdmin) {
    orders = orders.filter((order) => order.user.id === user.id);
  }

  return (
    <div className="my-6 bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{heading}</h2>

        {btnText && isAdmin && !propOrders && (
          <Button onClick={() => navigate("/admin/orders")}>{btnText}</Button>
        )}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              {isAdmin && <th className="px-4 py-3">User</th>}
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {isAdmin && (
                    <td className="px-4 py-3 font-medium">{order.user.name}</td>
                  )}

                  <td className="px-4 py-3">
                    {order.product.map((p) => (
                      <div key={p.id} className="mb-1">
                        {p.name} x {p.quantity} -{" "}
                        {formatter.format(p.price * p.quantity)}
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-3 text-gray-500">{order.date}</td>

                  <td className="px-4 py-3">
                    {isAdmin ? (
                      <select
                        value={order.status}
                        className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 appearance-none"
                        onChange={(e) => {
                          updateOrder(order.id, { status: e.target.value });
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : (
                      <span className="capitalize">{order.status}</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isAdmin ? 4 : 3}
                  className="text-center py-4 text-gray-500"
                >
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
