// import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
// import { useAppDispatch, useAppSelector } from "../../store/hooks"
// import { loginUser, setStatus } from "../../store/authSlice"
// import { Link, useNavigate } from "react-router-dom"
// import { Status } from "../../globals/types/type"

// function Login(){
//     const dispatch = useAppDispatch()
//     const navigate = useNavigate()
//     const {status,user} = useAppSelector((store)=>store.auth)

//     const [data,setData] = useState({
//         password : "", 
//         email : ""
//     })
//     const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
//         const {name,value} = e.target 
//         setData({
//             ...data, 
//             [name] : value
//         })
//     }

//     const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
//         e.preventDefault()
//         dispatch(loginUser({
//             email: data.email.trim().toLowerCase(),
//             password: data.password,
//         }))
//     }

//     useEffect(() => {
//         dispatch(setStatus(Status.LOADING))
//     }, [dispatch])

//     useEffect(() => {
//         if(status === Status.SUCCESS){
//             const destination = user?.isAdmin ? "/admin" : "/"
//             navigate(destination)
//         }
//     }, [status, navigate, user])

//     return ( 
//         <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
//     <div className="w-full max-w-md space-y-8">
//         <div className="bg-white shadow-md rounded-md p-6">

//             <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

//             <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
//                 Hello {user?.username ?? "Guest"}
//             </h2>

//             <p className="text-center text-sm text-gray-500">Please sign in to continue.</p>

//             <form className="space-y-6" onSubmit={handleSubmit}>

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
//                         <input name="password" type="password" autoComplete="current-password" required minLength={6} maxLength={128}
//                             className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={handleChange} />
//                     </div>
//                 </div>

//                 <div>
//                     <button type="submit"
//                         className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Login
//                         Account
//                         </button>
//                 </div>
//                     <p className="text-blue-500">Wanna Register? <Link to='/register'> Go to Register</Link></p>

//             </form>
//         </div>
//     </div>
// </div>
//     )
// }

// export default Login

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { loginUser, setStatus } from "../../store/authSlice"
import { Link, useNavigate } from "react-router-dom"
import { Status } from "../../globals/types/type"
import {
    Eye,
    EyeOff,
    Mail,
    LockKeyhole,
    ShoppingBag,
    UserRound,
    AlertCircle,
} from "lucide-react"

function Login() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { status, user } = useAppSelector((store) => store.auth)

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
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
            loginUser({
                email: data.email.trim().toLowerCase(),
                password: data.password,
            })
        )
    }

    // FIX 1: Reset the login state to IDLE on mount so previous transitions don't block auth actions
    useEffect(() => {
        dispatch(setStatus(Status.IDLE))
    }, [dispatch])

    // FIX 2: Navigation listener that executes correctly when status transitions to SUCCESS
    useEffect(() => {
        if (status === Status.SUCCESS) {
            const destination = user?.isAdmin ? "/admin" : "/"
            navigate(destination)
        }
    }, [status, navigate, user])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-9">

                    {/* Logo Section */}
                    <Link to="/" className="mb-8 flex items-center justify-center gap-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-200">
                            <ShoppingBag size={23} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-gray-900">
                            Hamro <span className="text-teal-600">Store</span>
                        </span>
                    </Link>

                    {/* Heading Section */}
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                            <UserRound size={32} />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Welcome Back!
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to continue to your dashboard.
                        </p>
                    </div>

                    {/* FIX 3: Visual Error Feedback block for a better user experience */}
                    {status === Status.ERROR && (
                        <div className="mb-4 flex items-center gap-2.5 rounded-xl bg-rose-50 p-3.5 text-sm text-rose-700 border border-rose-100 animate-shake">
                            <AlertCircle size={18} className="shrink-0" />
                            <p className="font-medium">Invalid email or password. Please try again.</p>
                        </div>
                    )}

                    {/* Login Form Matrix */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email Address Form Input Group */}
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={19} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    required
                                    minLength={5}
                                    maxLength={254}
                                    value={data.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition duration-150 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                />
                            </div>
                        </div>

                        {/* Password Form Input Group */}
                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <LockKeyhole size={19} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    maxLength={128}
                                    value={data.password}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border border-gray-300 bg-white pl-11 pr-12 py-3 text-sm text-gray-900 shadow-sm outline-none transition duration-150 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Action Block */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={status === Status.LOADING}
                                className="flex w-full justify-center rounded-xl bg-teal-600 py-3 px-4 text-sm font-semibold text-white shadow-md shadow-teal-600/10 hover:bg-teal-700 active:scale-[0.98] transition duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {status === Status.LOADING ? "Signing in..." : "Sign In"}
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Wanna Register?{" "}
                            <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-700 transition">
                                Go to Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
