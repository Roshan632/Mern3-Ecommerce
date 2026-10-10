import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Status } from "../globals/types/type";
import type { AppDispatch, RootState } from "./store";
import { APIWITHTOKEN } from "../http";
import {type IOrderDetail, PaymentMethod, PaymentStatus } from "../pages/my-orders-details/types";
export interface IAdminOrder{
    id : string,
    productQty : number, 
    orderStatus? : string, 
    totalAmount?:number, 
    Payment? : {
        paymentMethod : PaymentMethod,
        paymentStatus : PaymentStatus 
        
    }
}
export interface IAdminOrderUpdate extends Partial<IAdminOrder> {
    paymentStatus?: PaymentStatus
}
interface IInitialState{
    items : IAdminOrder[], 
    status : Status, 
    orderDetails : IOrderDetail[]
}
const initialState:IInitialState = {
    status : Status.LOADING, 
    items : [], 
    orderDetails : []
}

const orderSlice = createSlice({
    name : "adminOrders", 
    initialState, 
    reducers : {
        setItems(state:IInitialState, action:PayloadAction<IAdminOrder[]>){
            state.items = action.payload
        }, 
        setOrderDetails(state:IInitialState, action:PayloadAction<IOrderDetail[]>){
            state.orderDetails = action.payload
        }, 
        setStatus(state:IInitialState,action:PayloadAction<Status>){
            state.status = action.payload
        }, 
        setDeleteOrderItem(state:IInitialState, action:PayloadAction<string>){
            const index = state.items.findIndex(i=>i.id == action.payload)
            if(index !== -1) state.items.splice(index,1)
        }
        ,updateOrderItem(state:IInitialState, action:PayloadAction<IAdminOrder>){
            const index = state.items.findIndex(i=>i.id == action.payload.id)
            if(index !== -1) state.items[index] = action.payload
        },
        updateOrderDetail(state:IInitialState, action:PayloadAction<{id:string; data:IAdminOrderUpdate}>){
            const {id, data} = action.payload
            state.orderDetails = state.orderDetails.map((detail)=>{
                if(detail.orderId !== id) return detail
                return {
                    ...detail,
                    Order: {
                        ...detail.Order,
                        ...(data.orderStatus ? {orderStatus: data.orderStatus as IOrderDetail["Order"]["orderStatus"]} : {}),
                        ...(data.paymentStatus ? {
                            Payment: {
                                ...detail.Order.Payment,
                                paymentStatus: data.paymentStatus,
                            },
                        } : {}),
                    },
                }
            })
        }

        // updateOrderStatusToCancel(state:IOrder, action: PayloadAction<{orderId:string}>){
        //     const orderId = action.payload.orderId
        //     // state.items.map((item)=>item.)
        //     // console.log(state.items,"ST")
        //     // const data =  state.orderDetails.map((order)=>order.orderId == orderId ? {...order, [order.Order.orderStatus] : OrderStatus.Cancelled} : order)
        //     const datas = state.orderDetails.find((order)=>order.orderId === orderId)
        //     datas ? datas.Order.orderStatus = OrderStatus.Cancelled : ""
        //     // state.orderDetails = data
           
        // }
    }
})

export default orderSlice.reducer
const {setItems,setStatus,setOrderDetails,setDeleteOrderItem,updateOrderItem,updateOrderDetail} = orderSlice.actions

export { updateOrderItem }

export function fetchOrders(){
    return async function fetchOrdersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response =  await APIWITHTOKEN.get("/order/all")
            if(response.status >= 200 && response.status < 300){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(Array.isArray(response.data?.data) ? response.data.data : []))
            }else{
                dispatch(setStatus(Status.ERROR))
                toast.error(response.data?.message ?? "Unable to load orders")
            }
        } catch (error: unknown) {
            dispatch(setStatus(Status.ERROR))
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message
                : undefined
            toast.error(message ?? "Unable to load orders")
            
        }
    }
}

export function fetchAdminOrderDetails(id:string){
    return async function fetchAdminOrderDetailsThunk(dispatch:AppDispatch){
        try {
            const response =  await APIWITHTOKEN.get("/order/" + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                const details = Array.isArray(response.data?.data)
                    ? response.data.data
                    : response.data?.data
                        ? [response.data.data]
                        : []
                dispatch(setOrderDetails(details))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}
export function handleDeleteOrder(id:string){
    return async function handleDeleteOrderThunk(dispatch:AppDispatch){
        try {
            // server defines admin delete on the order router as POST /order/admin/delete-order/:id
            const response = await APIWITHTOKEN.post(`/order/admin/delete-order/${id}`)
            if(response.status >= 200 && response.status < 300){
                dispatch(setDeleteOrderItem(id))
                dispatch(setStatus(Status.SUCCESS))
                toast.success(response.data?.message ?? "Deleted successfully")
            }else{
                dispatch(setStatus(Status.ERROR))
                toast.error(response.data?.message ?? "Failed to delete order")
            }
        } catch (error: unknown) {
            console.error(error)
            dispatch(setStatus(Status.ERROR))
            const message = axios.isAxiosError(error) ? error.response?.data?.message : undefined
            toast.error(message ?? "Failed to delete order")
        }
    }
}
export function updateOrder(id:string,data:IAdminOrderUpdate){
    return async function updateOrderThunk(dispatch:AppDispatch, getState:()=>RootState){
        try{
            const response = await APIWITHTOKEN.patch(`/order/admin/change-status/${id}`, data)
            if(response.status >=200 && response.status < 300){
                const existing = getState().adminOrders.items.find((o:IAdminOrder)=>o.id == id)
                if(existing){
                    dispatch(updateOrderItem({
                        ...existing,
                        ...(data.orderStatus ? {orderStatus: data.orderStatus} : {}),
                        ...(data.paymentStatus ? {
                            Payment: {
                                ...existing.Payment,
                                paymentStatus: data.paymentStatus,
                            } as IAdminOrder["Payment"],
                        } : {}),
                    }))
                }
                dispatch(updateOrderDetail({id, data}))
                dispatch(setStatus(Status.SUCCESS))
                toast.success(response.data?.message ?? "Updated successfully")
                // refresh list from server to ensure UI matches backend
                dispatch(fetchOrders())
            }else{
                dispatch(setStatus(Status.ERROR))
                toast.error(response.data?.message ?? "Failed to update order")
            }
        }catch(error: unknown){
            console.error(error)
            dispatch(setStatus(Status.ERROR))
            const message = axios.isAxiosError(error) ? error.response?.data?.message : undefined
            toast.error(message ?? "Failed to update order")
        }
    }
}
// export function cancelOrderAPI(id:string){
//     return async function cancelOrderAPIThunk(dispatch:AppDispatch){
//         try {
//             const response =  await APIWITHTOKEN.patch("/order/cancel-order/" + id)
//             if(response.status === 200){
//                 dispatch(setStatus(Status.SUCCESS))
//                 dispatch(updateOrderStatusToCancel({orderId : id}))
//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.ERROR))
            
//         }
//     }
// }