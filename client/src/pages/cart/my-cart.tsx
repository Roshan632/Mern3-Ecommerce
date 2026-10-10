// import Navbar from "../../globals/components/Navbar"
// import { handleCartItemDelete, handleCartItemUpdate } from "../../store/cartSlice"
// import { useAppDispatch, useAppSelector } from "../../store/hooks"
// import { Link } from "react-router-dom"

// function MyCart(){
//     const {items} = useAppSelector((store)=>store.cart)
//     const dispatch = useAppDispatch()
//     const handleUpdate = (productId:string,quantity:number)=>{
//       if (quantity < 1) return
//         dispatch(handleCartItemUpdate(productId,quantity))
//     }
//     const handleDelete = (productId:string)=>{
//         dispatch(handleCartItemDelete(productId))
//     }
//     const subTotal = items.reduce((total,item)=>item.Product.productPrice * item.quantity + total,0)
//     const totalQtyInCarts = items.reduce((total,item)=>item.quantity + total, 0)
//     const shippingPrice = 100
//     const total = subTotal + shippingPrice

//     return ( 
//         <>
//         <Navbar />
//   <div className="bg-gray-100 h-screen py-8">
//   <div className="container mx-auto px-4">
//     <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
//     <div className="flex flex-col md:flex-row gap-4">
//       <div className="md:w-3/4">
//         <div className="bg-white rounded-lg shadow-md p-6 mb-4">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="text-left font-semibold">Product</th>
//                 <th className="text-left font-semibold">Price</th>
//                 <th className="text-left font-semibold">Quantity</th>
//                 <th className="text-left font-semibold">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {
//                 items.length > 0 && items.map((item)=>{
//                     return ( 
//                         <tr>
//                 <td className="py-4">
//                   <div className="flex items-center">
//                     <img className="h-16 w-16 mr-4" src={`http://localhost:3000/${item.Product?.productImageUrl}`} alt="Product image" />
//                     <span className="font-semibold">{item.Product.productName}</span>
//                   </div>
//                 </td>
//                 <td className="py-4">Rs. {item.Product.productPrice}</td>
//                 <td className="py-4">
//                   <div className="flex items-center">
//                     <button className="border rounded-md py-2 px-4 mr-2" onClick={()=>handleUpdate(item.Product.id,item.quantity - 1)}>-</button>
//                     <span className="text-center w-8">{item.quantity}</span>
//                     <button className="border rounded-md py-2 px-4 ml-2" onClick={()=>handleUpdate(item.Product.id,item.quantity + 1)}>+</button>
//                   </div>
//                 </td>
//                 <td className="py-4">{item.Product.productPrice * item?.quantity }</td>
//                 <td className="py-4">
//                   <div className="flex items-center">
//                     <button className="border rounded-md py-2 px-4 ml-2 bg-red-600 hover:bg-red-800" onClick={()=>handleDelete(item.Product.id)}>X</button>
//                   </div>
//                 </td>
                
//               </tr>

//                     )
//                 })
//               }
              
//               {/* More product rows */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="md:w-1/4">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-4">Summary</h2>
//           <div className="flex justify-between mb-2">
//             <span>Subtotal</span>
//             <span>Rs {subTotal}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Total Qty</span>
//             <span>{totalQtyInCarts}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Shipping</span>
//             <span>Rs {shippingPrice}</span>
//           </div>
//           <hr className="my-2" />
//           <div className="flex justify-between mb-2">
//             <span className="font-semibold">Total</span>
//             <span className="font-semibold">Rs. {total}</span>
//           </div>
//           <Link to="/my-checkout">
//          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
//          </Link> 
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//         </>
//     )
// }

// export default MyCart





import Navbar from "../../globals/components/Navbar"
import { handleCartItemDelete, handleCartItemUpdate } from "../../store/cartSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { Link } from "react-router-dom"
import { ShoppingBag, Trash2, ArrowRight, ShoppingCart } from "lucide-react"
import { getMediaUrl } from "../../http"

function MyCart() {
  const { items } = useAppSelector((store) => store.cart)
  const dispatch = useAppDispatch()

  const handleUpdate = (productId: string, quantity: number) => {
    if (quantity < 1) return
    dispatch(handleCartItemUpdate(productId, quantity))
  }

  const handleDelete = (productId: string) => {
    dispatch(handleCartItemDelete(productId))
  }

  const subTotal = items.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0
  )

  const totalQtyInCarts = items.reduce(
    (total, item) => item.quantity + total,
    0
  )

  const shippingPrice = items.length > 0 ? 100 : 0
  const total = subTotal + shippingPrice

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Shopping Cart
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Review your items before proceeding to checkout.
            </p>
          </div>

          {/* Empty Cart */}
          {items.length === 0 ? (
            <section className="flex min-h-[55vh] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-50">
                <ShoppingCart className="h-12 w-12 text-teal-600" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Your cart is empty
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                Looks like you haven't added anything to your cart yet.
                Explore our products and find something you love.
              </p>

              <Link
                to="/products"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/"
                className="mt-4 text-sm font-medium text-gray-500 transition-colors hover:text-teal-700"
              >
                Back to Home
              </Link>
            </section>
          ) : (
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
              {/* Cart Items */}
              <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Cart Items
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {totalQtyInCarts} item(s) in your cart
                    </p>
                  </div>

                  <ShoppingBag className="h-6 w-6 text-teal-600" />
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6"
                    >
                      <img
                        className="h-24 w-24 shrink-0 rounded-xl border border-gray-100 bg-gray-50 object-cover"
                        src={getMediaUrl(item.Product?.productImageUrl)}
                        alt={item.Product?.productName ?? "Product"}
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words font-semibold text-gray-900">
                          {item.Product?.productName ?? "Product unavailable"}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Rs. {item.Product?.productPrice ?? 0} per item
                        </p>

                        <p className="mt-2 text-base font-bold text-teal-700">
                          Rs. {(item.Product?.productPrice ?? 0) * item.quantity}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
                        {/* Quantity Controls */}
                        <div className="flex items-center rounded-lg border border-gray-200">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              handleUpdate(item.Product.id, item.quantity - 1)
                            }
                            className="rounded-l-lg px-3 py-2.5 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            −
                          </button>

                          <span className="min-w-10 px-2 text-center text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() =>
                              handleUpdate(item.Product.id, item.quantity + 1)
                            }
                            className="rounded-r-lg px-3 py-2.5 text-gray-600 transition-colors hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Item */}
                        <button
                          type="button"
                          aria-label={`Remove ${item.Product?.productName ?? "product"}`}
                          onClick={() => handleDelete(item.Product.id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sm:hidden">Remove</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4 sm:px-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-800"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                </div>
              </section>

              {/* Order Summary */}
              <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-gray-900">
                  Order Summary
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Review your order total.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      Rs. {subTotal}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-500">Total Quantity</span>
                    <span className="font-medium text-gray-900">
                      {totalQtyInCarts}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-gray-900">
                      Rs. {shippingPrice}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-xl font-extrabold text-gray-900">
                        Rs. {total}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/my-checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                  Shipping is calculated at Rs. 100 per order.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default MyCart