import { Link } from "react-router-dom";
import {
  handleDeleteOrder,
  type IAdminOrder,
} from "../../../../store/adminOrderSlice";
import { useAppDispatch } from "../../../../store/hooks";

interface AdminOrderTableProps {
  orders: IAdminOrder[];
}

function AdminOrderTable({ orders }: AdminOrderTableProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="rounded bg-white p-4 shadow">
      <h1 className="mb-4 text-xl font-semibold text-gray-900">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 font-semibold">Order</th>
              <th className="px-4 py-3 font-semibold">Quantity</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Payment</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.productQty}</td>
                <td className="px-4 py-3">Rs. {order.totalAmount ?? 0}</td>
                <td className="px-4 py-3">{order.orderStatus ?? "pending"}</td>
                <td className="px-4 py-3">{order.Payment?.paymentStatus ?? "unpaid"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="rounded bg-gray-900 px-3 py-2 text-white hover:bg-gray-800"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => dispatch(handleDeleteOrder(order.id))}
                      className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={6}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrderTable;
