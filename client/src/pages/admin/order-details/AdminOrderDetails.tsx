// import { useEffect, useState, type ChangeEvent } from "react"
// import { useParams } from "react-router-dom"
// import { fetchAdminOrderDetails, updateOrder } from "../../../store/adminOrderSlice"
// import { useAppDispatch, useAppSelector } from "../../../store/hooks"
// import { OrderStatus, type PaymentStatus } from "../../my-orders-details/types"
// import AdminLayout from "../AdminLayout"

// function AdminOrderDetail() {
//   const dispatch = useAppDispatch()
//   const { id } = useParams()
//   const { orderDetails, status } = useAppSelector((store) => store.adminOrders)
//   const [selectedOrderStatus, setSelectedOrderStatus] = useState<OrderStatus | "">("")
//   const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<PaymentStatus | "">("")

//   useEffect(() => {
//     if (id) dispatch(fetchAdminOrderDetails(id))
//   }, [id, dispatch])

//   useEffect(() => {
//     setSelectedOrderStatus(orderDetails[0]?.Order?.orderStatus ?? "")
//     setSelectedPaymentStatus(orderDetails[0]?.Order?.Payment?.paymentStatus ?? "")
//   }, [orderDetails])

//   const handleOrderStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     const nextStatus = event.target.value as OrderStatus
//     setSelectedOrderStatus(nextStatus)
//     if (id && orderDetails[0]?.Order) dispatch(updateOrder(id, { orderStatus: nextStatus }))
//   }

//   const handlePaymentStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     const nextStatus = event.target.value as PaymentStatus
//     setSelectedPaymentStatus(nextStatus)
//     if (id && orderDetails[0]?.Order) dispatch(updateOrder(id, { paymentStatus: nextStatus }))
//   }

//   return (
//     <AdminLayout>
//       {status === "loading" && orderDetails.length === 0 ? (
//         <div className="py-14 text-center text-gray-600">Loading order details...</div>
//       ) : status === "error" && orderDetails.length === 0 ? (
//         <div className="py-14 text-center text-red-600">Unable to load this order.</div>
//       ) : orderDetails.length === 0 ? (
//         <div className="py-14 text-center text-gray-600">Order details not found.</div>
//       ) : (
//         <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
//           <header className="mb-8 border-b border-gray-200 pb-5">
//             <h1 className="break-all text-2xl font-semibold text-gray-900">Order #{orderDetails[0].orderId}</h1>
//             <p className="mt-2 text-sm text-gray-600">{new Date(orderDetails[0].createdAt).toLocaleDateString()}</p>
//             <p className="mt-1 text-sm text-gray-700">Order status: {orderDetails[0].Order?.orderStatus}</p>
//           </header>

//           <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
//             <div className="space-y-6">
//               <section className="rounded-lg bg-gray-50 p-5">
//                 <h2 className="mb-4 text-lg font-semibold text-gray-900">Order items</h2>
//                 <div className="divide-y divide-gray-200">
//                   {orderDetails.map((item) => {
//                     const price = item.Product?.productPrice ?? 0
//                     return (
//                       <article key={item.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
//                         <img
//                           className="h-24 w-24 rounded-md bg-white object-cover"
//                           src={`http://localhost:3000/${item.Product?.productImageUrl ?? ""}`}
//                           alt={item.Product?.productName ?? "Product"}
//                         />
//                         <div className="min-w-0 flex-1">
//                           <h3 className="font-semibold text-gray-900">{item.Product?.productName ?? "Product unavailable"}</h3>
//                           <p className="mt-1 text-sm text-gray-600">Category: {item.Product?.Category?.categoryName ?? "—"}</p>
//                           <p className="mt-2 text-sm text-gray-700">Rs. {price} × {item.quantity}</p>
//                         </div>
//                         <p className="font-semibold text-gray-900">Rs. {item.quantity * price}</p>
//                       </article>
//                     )
//                   })}
//                 </div>
//               </section>

//               <section className="rounded-lg bg-gray-50 p-5">
//                 <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
//                 <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
//                   <span className="font-medium text-gray-700">Total</span>
//                   <span className="font-semibold text-gray-900">Rs. {orderDetails[0].Order?.totalAmount ?? 0}</span>
//                 </div>
//               </section>
//             </div>

//             <aside className="space-y-6">
//               <section className="rounded-lg bg-gray-50 p-5">
//                 <h2 className="text-lg font-semibold text-gray-900">Customer & shipping</h2>
//                 <dl className="mt-4 space-y-3 text-sm">
//                   <div>
//                     <dt className="text-gray-500">Name</dt>
//                     <dd className="font-medium text-gray-900">{orderDetails[0].Order?.firstName} {orderDetails[0].Order?.lastName}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-gray-500">Phone</dt>
//                     <dd className="font-medium text-gray-900">{orderDetails[0].Order?.phoneNumber}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-gray-500">Address</dt>
//                     <dd className="font-medium text-gray-900">
//                       {[orderDetails[0].Order?.AddressLine, orderDetails[0].Order?.City, orderDetails[0].Order?.State].filter(Boolean).join(", ") || "—"}
//                     </dd>
//                   </div>
//                 </dl>
//               </section>

//               <section className="space-y-4 rounded-lg bg-gray-50 p-5">
//                 <h2 className="text-lg font-semibold text-gray-900">Update status</h2>
//                 <div>
//                   <label htmlFor="payment-status" className="mb-1 block text-sm font-medium text-gray-700">Payment status</label>
//                   <select id="payment-status" value={selectedPaymentStatus} onChange={handlePaymentStatusChange} className="w-full rounded border border-gray-300 bg-white px-3 py-2">
//                     <option value="paid">Paid</option>
//                     <option value="unpaid">Unpaid</option>
//                   </select>
//                 </div>
//                 {orderDetails[0].Order?.orderStatus !== OrderStatus.Cancelled && (
//                   <div>
//                     <label htmlFor="order-status" className="mb-1 block text-sm font-medium text-gray-700">Order status</label>
//                     <select id="order-status" value={selectedOrderStatus} onChange={handleOrderStatusChange} className="w-full rounded border border-gray-300 bg-white px-3 py-2">
//                       <option value="pending">Pending</option>
//                       <option value="preparation">Preparation</option>
//                       <option value="ontheway">On the way</option>
//                       <option value="delivered">Delivered</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                   </div>
//                 )}
//               </section>
//             </aside>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   )
// }

// export default AdminOrderDetail


import { useEffect, useState, type ChangeEvent } from "react"
import { useParams } from "react-router-dom"
import { fetchAdminOrderDetails, updateOrder } from "../../../store/adminOrderSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { getMediaUrl } from "../../../http"
import { OrderStatus, type PaymentStatus } from "../../my-orders-details/types"
import AdminLayout from "../AdminLayout"

function AdminOrderDetail() {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { orderDetails, status } = useAppSelector((store) => store.adminOrders)
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<OrderStatus | "">("")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<PaymentStatus | "">("")

  useEffect(() => {
    if (id) dispatch(fetchAdminOrderDetails(id))
  }, [id, dispatch])

  useEffect(() => {
    setSelectedOrderStatus(orderDetails[0]?.Order?.orderStatus ?? "")
    setSelectedPaymentStatus(orderDetails[0]?.Order?.Payment?.paymentStatus ?? "")
  }, [orderDetails])

  const handleOrderStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = event.target.value as OrderStatus
    setSelectedOrderStatus(nextStatus)
    if (id && orderDetails[0]?.Order) dispatch(updateOrder(id, { orderStatus: nextStatus }))
  }

  const handlePaymentStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = event.target.value as PaymentStatus
    setSelectedPaymentStatus(nextStatus)
    if (id && orderDetails[0]?.Order) dispatch(updateOrder(id, { paymentStatus: nextStatus }))
  }

  return (
    <AdminLayout>
      {status === "loading" && orderDetails.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center px-4 py-14 text-center text-sm font-medium text-gray-500">
          Loading order details...
        </div>
      ) : status === "error" && orderDetails.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center px-4 py-14 text-center text-sm font-medium text-red-600">
          Unable to load this order.
        </div>
      ) : orderDetails.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center px-4 py-14 text-center text-sm font-medium text-gray-500">
          Order details not found.
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <header className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:mb-8 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h1 className="break-all text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  Order #{orderDetails[0].orderId}
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Placed on {new Date(orderDetails[0].createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Order status</span>
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700 ring-1 ring-inset ring-blue-100">
                  {orderDetails[0].Order?.orderStatus}
                </span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <div className="min-w-0 space-y-6">
              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                  <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                    Order items
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Products included in this order
                  </p>
                </div>

                <div className="divide-y divide-gray-100 px-5 sm:px-6">
                  {orderDetails.map((item) => {
                    const price = item.Product?.productPrice ?? 0
                    return (
                      <article
                        key={item.id}
                        className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
                      >
                        <img
                          className="h-24 w-24 shrink-0 rounded-lg border border-gray-100 bg-gray-50 object-cover"
                          src={getMediaUrl(item.Product?.productImageUrl)}
                          alt={item.Product?.productName ?? "Product"}
                        />

                        <div className="min-w-0 flex-1">
                          <h3 className="break-words text-sm font-semibold text-gray-900 sm:text-base">
                            {item.Product?.productName ?? "Product unavailable"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Category: {item.Product?.Category?.categoryName ?? "—"}
                          </p>
                          <p className="mt-2 text-sm text-gray-600">
                            Rs. {price} × {item.quantity}
                          </p>
                        </div>

                        <p className="shrink-0 text-base font-bold text-gray-900">
                          Rs. {item.quantity * price}
                        </p>
                      </article>
                    )
                  })}
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                  Summary
                </h2>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
                  <span className="text-sm font-medium text-gray-600">
                    Total amount
                  </span>
                  <span className="text-xl font-bold tracking-tight text-gray-900">
                    Rs. {orderDetails[0].Order?.totalAmount ?? 0}
                  </span>
                </div>
              </section>
            </div>

            <aside className="min-w-0 space-y-6">
              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                  Customer & shipping
                </h2>

                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Customer name
                    </dt>
                    <dd className="mt-1 break-words text-sm font-medium text-gray-900">
                      {orderDetails[0].Order?.firstName} {orderDetails[0].Order?.lastName}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Phone number
                    </dt>
                    <dd className="mt-1 break-words text-sm font-medium text-gray-900">
                      {orderDetails[0].Order?.phoneNumber}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Shipping address
                    </dt>
                    <dd className="mt-1 break-words text-sm leading-6 text-gray-700">
                      {[orderDetails[0].Order?.AddressLine, orderDetails[0].Order?.City, orderDetails[0].Order?.State].filter(Boolean).join(", ") || "—"}
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div>
                  <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                    Update status
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage payment and order progress
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="payment-status"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Payment status
                  </label>
                  <select
                    id="payment-status"
                    value={selectedPaymentStatus}
                    onChange={handlePaymentStatusChange}
                    className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>

                {orderDetails[0].Order?.orderStatus !== OrderStatus.Cancelled && (
                  <div className="space-y-2">
                    <label
                      htmlFor="order-status"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Order status
                    </label>
                    <select
                      id="order-status"
                      value={selectedOrderStatus}
                      onChange={handleOrderStatusChange}
                      className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparation">Preparation</option>
                      <option value="ontheway">On the way</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                )}
              </section>
            </aside>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminOrderDetail