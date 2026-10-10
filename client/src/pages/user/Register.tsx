// import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
// import { useAppDispatch,useAppSelector } from "../../store/hooks"
// import { registerUser } from "../../store/authSlice"
// import { Status } from "../../globals/types/type"
// import { Link, useNavigate } from "react-router-dom"

// function Register(){
//     const {status} = useAppSelector((store)=>store.auth)
//     const navigate = useNavigate()
//     const dispatch = useAppDispatch()
//     const [data,setData] = useState({
//         username : "", 
//         password : "", 
//         email : "",
//         token : ""
//     })
//     const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
//         const {name,value} = e.target 
//         setData({
//             ...data, 
//             [name] : value
//         })
//     }

//     const handleSubmit =  (e:FormEvent<HTMLFormElement>)=>{
//         e.preventDefault()
//         dispatch(registerUser({
//             ...data,
//             username: data.username.trim(),
//             email: data.email.trim().toLowerCase(),
//         }))
//     }
//     useEffect(()=>{
//         if(status === Status.SUCCESS){
//             navigate("/login")
//         }
//     },[status,navigate])

//     return ( 
//         <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
//     <div className="w-full max-w-md space-y-8">
//         <div className="bg-white shadow-md rounded-md p-6">

//             <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

//             <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
//                 Sign up for an account
//             </h2>


//             <form className="space-y-6" onSubmit={handleSubmit}>

//                 <div>
//                     <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Username</label>
//                     <div className="mt-1">
//                         <input name="username" type="text" required minLength={2} maxLength={50} pattern="[A-Za-z0-9_ ]+"
//                             className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={handleChange} />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                     <div className="mt-1">
//                         <input name="email" type="email" autoComplete="email" required minLength={5} maxLength={254}
//                             className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={handleChange} />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                     <div className="mt-1">
//                         <input name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={128}
//                             className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={handleChange} />
//                     </div>
//                 </div>

//                 <div>
//                     <button type="submit"
//                         className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Register
//                         Account
//                         </button>
//                 </div>
//                 <p className="text-blue-500">Wanna login? <Link to='/login'> Go to Login</Link></p>
//             </form>
//         </div>
//     </div>
// </div>
//     )
// }

// export default Register


import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { registerUser } from "../../store/authSlice"
import { Status } from "../../globals/types/type"
import { Link, useNavigate } from "react-router-dom"
import { UserRound, UserPlus, Mail, Lock, ShoppingBag, Eye, EyeOff } from "lucide-react"

function Register() {
  const { status } = useAppSelector((store) => store.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = useState(false)

  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      registerUser({
        ...data,
        username: data.username.trim(),
        email: data.email.trim().toLowerCase(),
      })
    )
  }

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigate("/login")
    }
  }, [status, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Brand Logo */}
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/20">
            <ShoppingBag className="h-5 w-5" />
          </span>
          Hamro <span className="text-teal-600">Store</span>
        </Link>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8">
          {/* Form Header */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <UserRound className="h-8 w-8" />
            </div>

            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Create an account
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Join Hamro Store and start shopping today.
            </p>
          </div>

          {/* Form Matrix */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Username
              </label>

              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  minLength={2}
                  maxLength={50}
                  pattern="[A-Za-z0-9_ ]+"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  minLength={5}
                  maxLength={254}
                  value={data.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                />
              </div>
            </div>

            {/* Password Field with Fixed Toggle View */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Fixed dynamic type assignment here
                  autoComplete="new-password"
                  required
                  minLength={8}
                  maxLength={128}
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Your password must contain at least 8 characters.
              </p>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/20 active:translate-y-0"
            >
              <UserPlus className="h-5 w-5" />
              Create Account
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-teal-700 transition-colors hover:text-teal-800 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Your shopping journey starts here.
        </p>
      </div>
    </div>
  )
}

export default Register
