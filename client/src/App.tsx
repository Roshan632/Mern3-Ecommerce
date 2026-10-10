
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/user/Register'
import { Provider } from 'react-redux'
import store from './store/store'
import Home from './pages/home/Home.tsx'
import Login from './pages/user/Login'
import Product from './pages/product/Product'
import SingleProduct from './pages/single-product/SingleProduct'
import MyCart from './pages/cart/my-cart.tsx'
import Checkout from './pages/checkout/Checkout'
import MyOrder from './pages/my-orders/MyOrder'
import MyOrderDetail from './pages/my-orders-details/MyOrderDetail'

import Categories from './pages/admin/categories/Categories'
import AdminStats from './pages/admin/stats/AdminStats'
import User from './pages/admin/users/Users'
import AdminProduct from './pages/admin/products/Product'
import ProductDescription from './pages/admin/productDescription/ProductDescription'

import AdminOrder from './pages/admin/orders/AdminOrder'
import AdminOrderDetail from './pages/admin/order-details/AdminOrderDetails'
import AdminRoute from './pages/admin/AdminRoute'
import { io } from 'socket.io-client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './globals/components/Footer'
import About from "./pages/About/About"
import { getBackendBaseUrl } from './http'

const socketBaseUrl = (import.meta.env.VITE_SOCKET_URL as string | undefined)?.replace(/\/$/, '') ?? getBackendBaseUrl()

export const socket = io(socketBaseUrl,{
  autoConnect: false,
  reconnection: false,
  auth : {
    token  : localStorage.getItem("tokenHoYo")
  }
})

function App() {
  

  return (
    <>
    <Provider store={store}>

     <BrowserRouter>
     <ToastContainer position="top-right" autoClose={4000} />
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login />}/>
       <Route path='/products' element={<Product/>}/>
       <Route path='/products/:id' element={<SingleProduct/>}/>
       <Route path='/product/:id' element={<SingleProduct/>}/>
        <Route path="/my-cart" element={<MyCart />} />
        <Route path="/my-checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrder />} />
    <Route path="/my-orders/:id" element={<MyOrderDetail />} />
      <Route element={<AdminRoute><Outlet /></AdminRoute>}>
        <Route path='/admin' element={<AdminStats />} />
        <Route path='/admin/categories' element={<Categories />} />
        <Route path='/admin/users' element={<User />} />
        <Route path='/admin/products' element={<AdminProduct />} />
        <Route path='/admin/products/:id' element={<ProductDescription />} />
        <Route path='/admin/orders' element={<AdminOrder />} />
        <Route path='/admin/orders/:id' element={<AdminOrderDetail />} />
      </Route>
     </Routes>
     
     </BrowserRouter>
    <Footer />

    </Provider>
    </>
  )
}

export default App
