import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import { toast } from "react-toastify";

import type { AppDispatch } from "./store";
import {API} from "../http";

interface ILoginUser{
    email : string, 
    password : string
}

interface IRegisterUser {
    username: string,
    email: string,
    password: string
}

interface IUser{
    username : string | null, 
    email : string | null, 
    password : string | null,
    token:string | null,
    role?: string | null,
    isAdmin?: boolean
}

interface IAuthState{
    user : IUser, 
    status : Status,
    
}

const initialState:IAuthState = {
    user : {
        username : null, 
        email : null, 
        password : null,
        token: localStorage.getItem("tokenHoYo") ?? null,
        role: null,
        isAdmin: false
    }, 
    status : Status.LOADING
}

const getMessageFromPayload = (payload: unknown, fallback: string): string => {
    if (typeof payload === "string") return payload

    if (payload && typeof payload === "object") {
        const maybe = payload as {
            message?: unknown
            msg?: unknown
            error?: unknown
            detail?: unknown
            data?: {
                message?: unknown
                msg?: unknown
            }
        }

        if (typeof maybe.message === "string") return maybe.message
        if (typeof maybe.msg === "string") return maybe.msg
        if (typeof maybe.error === "string") return maybe.error
        if (typeof maybe.detail === "string") return maybe.detail

        if (maybe.data) {
            if (typeof maybe.data.message === "string") return maybe.data.message
            if (typeof maybe.data.msg === "string") return maybe.data.msg
        }
    }

    return fallback
}

const getErrorMessage = (error: unknown, fallback: string): string => {
    if (error && typeof error === "object") {
        const maybe = error as {
            response?: {
                data?: unknown
            }
            message?: string
        }

        if (maybe.response?.data) {
            return getMessageFromPayload(maybe.response.data, maybe.message ?? fallback)
        }

        if (typeof maybe.message === "string") return maybe.message
    }

    return fallback
}
const authSlice = createSlice({
    name : "auth", 
    initialState, 
    reducers : {
        setUser(state:IAuthState,action:PayloadAction<IUser>){
            state.user = action.payload
        }, 
        setStatus(state:IAuthState,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setToken(state:IAuthState,action:PayloadAction<string>){
            state.user.token = action.payload
        },
        logout(state:IAuthState){
            state.user = {
                username: null,
                email: null,
                password: null,
                token: null
            }
            state.status = Status.LOADING
            localStorage.removeItem("tokenHoYo")
        }
}
})
export const {setStatus,setUser,setToken,logout} = authSlice.actions
export default authSlice.reducer

export function registerUser(data:IRegisterUser){
    return async function registerUserThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
                 const response = await API.post("/auth/register",{
                     username: data.username,
                     email: data.email,
                     password: data.password,
                 })
            if(response.status === 201){
                if(response.data.token){
                    localStorage.setItem("tokenHoYo",response.data.token)
                    dispatch(setToken(response.data.token))
                }

                dispatch(setUser({
                    username: response.data?.username ?? data.username,
                    email: response.data?.email ?? data.email,
                    password: null,
                    token: response.data?.token ?? null,
                    role: response.data?.role ?? null,
                    isAdmin: response.data?.isAdmin ?? (response.data?.role === "admin")
                }))

                const successMessage = getMessageFromPayload(response.data, "Registration successful")
                toast.success(successMessage)
                dispatch(setStatus(Status.SUCCESS))
            }else{
                const errorMessage = getMessageFromPayload(response.data, "Registration failed")
                toast.error(errorMessage)
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Something went wrong")
            toast.error(errorMessage)
            dispatch(setStatus(Status.ERROR))
        }

    }
}
export function loginUser(data:ILoginUser){
    return async function loginUserThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
               const response = await API.post("/auth/login",data)
            if(response.status === 200){
                if(response.data?.token){
                    localStorage.setItem("tokenHoYo",response.data.token)
                    dispatch(setToken(response.data.token))
                }

                dispatch(setUser({
                    username: response.data?.username ?? null,
                    email: response.data?.email ?? data.email,
                    password: null,
                    token: response.data?.token ?? null,
                    role: response.data?.role ?? null,
                    isAdmin: response.data?.isAdmin ?? (response.data?.role === "admin")
                }))

                const successMessage = getMessageFromPayload(response.data, "Login successful")
                toast.success(successMessage)
                dispatch(setStatus(Status.SUCCESS))
            }else{
                const errorMessage = getMessageFromPayload(response.data, "Login failed")
                toast.error(errorMessage)
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Invalid email or password")
            toast.error(errorMessage)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function forgotPassword(data:{email : string}){
    return async function forgotPasswordThunk(dispatch:AppDispatch){
        try {
             const response = await API.post("/auth/forgot-password",data)
            if(response.status === 200){
                const successMessage = getMessageFromPayload(response.data, "Password reset instructions sent")
                toast.success(successMessage)
                dispatch(setStatus(Status.SUCCESS))
            }else{
                const errorMessage = getMessageFromPayload(response.data, "Failed to send reset instructions")
                toast.error(errorMessage)
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Failed to send reset instructions")
            toast.error(errorMessage)
            dispatch(setStatus(Status.ERROR))
        }
    }
}