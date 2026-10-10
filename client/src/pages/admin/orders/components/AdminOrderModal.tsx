import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { updateOrder } from '../../../../store/adminOrderSlice'
import { Status } from '../../../../globals/types/type'
import { OrderStatus } from '../../../my-orders-details/types'
import type { IAdminOrder } from '../../../../store/adminOrderSlice'

interface Props{
  order: IAdminOrder
  closeModal: ()=>void
}

const AdminOrderModal:React.FC<Props> = ({order, closeModal}) =>{
  const dispatch = useAppDispatch()
  const {status} = useAppSelector(s=>s.adminOrders)
  const [orderStatus,setOrderStatus] = useState(order.orderStatus ?? "pending")
  const [totalAmount,setTotalAmount] = useState<number>(order.totalAmount ?? 0)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    if(status === Status.SUCCESS && loading){
      setLoading(false)
      closeModal()
    }
  },[status,loading])

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    dispatch(updateOrder(order.id, { orderStatus, totalAmount }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Edit Order</h3>
          <button onClick={closeModal} className="text-gray-500">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order Status</label>
            <select value={orderStatus} onChange={(e)=>setOrderStatus(e.target.value)} className="w-full mt-1 p-2 border rounded-md">
              <option value={OrderStatus.Preparation}>Preparation</option>
              <option value={OrderStatus.Ontheway}>On the way</option>
              <option value={OrderStatus.Delivered}>Delivered</option>
              <option value={OrderStatus.Pending}>Pending</option>
              <option value={OrderStatus.Cancelled}>Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Amount</label>
            <input value={totalAmount} onChange={(e)=>setTotalAmount(Number(e.target.value))} type="number" min="0" step="0.01" required className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{loading? 'Updating...' : 'Update'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminOrderModal
