// import { Link, NavLink } from "react-router-dom"
// import { useAppSelector, useAppDispatch } from "../../store/hooks"
// import { useEffect} from "react"
// import { logout } from "../../store/authSlice"
// import { fetchCartItems } from "../../store/cartSlice"
// import { ShoppingCart } from "lucide-react"
// import logo  from '././../../assets/hamrostorelogo.jpg'
// const navItems = [
//   { to: "/", label: "Home" },
//   { to: "/products", label: "Products" },
//   { to: "/about", label: "About" },
// ]

// function Navbar(){
//     const dispatch = useAppDispatch()
//     //const navigate = useNavigate()
//     const reduxToken = useAppSelector((store)=>store.auth.user.token)
//     const user = useAppSelector((store)=>store.auth.user)
//     const {items} = useAppSelector((store)=>store.cart)
//     const localStorageToken = localStorage.getItem("tokenHoYo")
//     const isLoggedIn = !!localStorageToken || !!reduxToken

//     useEffect(()=>{
//       if(isLoggedIn){
//           dispatch(fetchCartItems())
//         }
//     },[isLoggedIn, dispatch])

//   return (
//     <header className="sticky top-0 z-40 border-0 bg-white shadow-sm">
//       <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
//         <Link to="/" className="text-xl font-bold text-gray-900">
//          <img src={logo} alt="Hamro Store" className="h-10 w-10 rounded-full" /> 
//         </Link>
//          <Link to="/" className="text-xl font-bold text-gray-900">
//         <span className="text-xl font-bold text-gray-900">Hamro Store</span>
//         </Link>

//         <nav className="flex flex-wrap items-center gap-8 text-sm font-medium">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className={({ isActive }) =>
//                 isActive ? "text-teal-700" : "text-gray-600 hover:text-gray-900"
//               }
//             >
//               {item.label}
//             </NavLink>
//           ))}
//           <Link to="/my-cart" className="text-gray-600 hover:text-gray-900">
//             <ShoppingCart className="inline-block h-5 w-5 mr-1" />
//             <span className="text-gray-600 align-super">{items.length}</span>
//           </Link>
//           {isLoggedIn ? (
//             <div className="flex items-center gap-3">
//               <span className="text-gray-600">{user.username || user.email || "Account"}</span>
//               <button
//                 type="button"
//                 onClick={() => dispatch(logout())}
//                 className="rounded bg-red-600 px-3 py-2 cursor-pointer text-white hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-3">
//               <Link
//                 to="/login"
//                 className="rounded bg-teal-600 px-3 py-2 text-white hover:bg-teal-700"
//               >
//                 Login
//               </Link>
//               <Link to="/register" className="text-gray-600 hover:text-gray-900">
//                 Register
//               </Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Navbar;



import { Link, NavLink } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { useEffect } from "react"
import { logout } from "../../store/authSlice"
import { fetchCartItems } from "../../store/cartSlice"
import { ShoppingCart } from "lucide-react"
import logo from "././../../assets/hamrostorelogo.jpg"

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
]

function Navbar() {
  const dispatch = useAppDispatch()
  //const navigate = useNavigate()
  const reduxToken = useAppSelector((store) => store.auth.user.token)
  const user = useAppSelector((store) => store.auth.user)
  const { items } = useAppSelector((store) => store.cart)
  const localStorageToken = localStorage.getItem("tokenHoYo")
  const isLoggedIn = !!localStorageToken || !!reduxToken

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartItems())
    }
  }, [isLoggedIn, dispatch])

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo and Brand */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
        >
          <img
            src={logo}
            alt="Hamro Store"
            className="h-11 w-11 rounded-full border border-gray-100 object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            Hamro <span className="text-teal-600">Store</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-medium sm:gap-x-7">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative py-2 transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-teal-700 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-teal-600"
                    : "text-gray-600 hover:text-teal-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Cart */}
          <Link
            to="/my-cart"
            aria-label={`Shopping cart, ${items.length} items`}
            className="group relative flex items-center gap-2 rounded-lg px-2 py-2 text-gray-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
          >
            <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-105" />
            <span className="text-sm font-medium">Cart</span>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
              {items.length}
            </span>
          </Link>

          {/* Authentication */}
          {isLoggedIn ? (
            <div className="flex flex-wrap items-center gap-3 border-l border-gray-200 pl-4">
              <div className="hidden max-w-36 sm:block">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Signed in as
                </p>
                <p className="truncate text-sm font-semibold text-gray-800">
                  {user.username || user.email || "Account"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => dispatch(logout())}
                className="cursor-pointer rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <Link
                to="/login"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-teal-600 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
