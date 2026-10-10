import { useEffect } from "react";
import { fetchOrders } from "../../../store/adminOrderSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import AdminLayout from "../AdminLayout";
import AdminOrderTable from "./components/AdminOrderTable";


function AdminOrder(){
    const dispatch = useAppDispatch()
    const {items, status} = useAppSelector((store)=>store.adminOrders)
     useEffect(()=>{
         dispatch(fetchOrders())
     },[dispatch])
    return (
        <AdminLayout>
            {status === "loading" ? (
                <div className="py-14 text-center text-gray-600">Loading orders...</div>
            ) : status === "error" ? (
                <div className="py-14 text-center text-red-600">Unable to load orders. Please check your admin login.</div>
            ) : (
                <AdminOrderTable orders={items} />
            )}
        </AdminLayout>
    )
}
export default AdminOrder