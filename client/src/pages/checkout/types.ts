import { Status } from "../../globals/types/type";
import type { IOrderDetail } from "../my-orders-details/types";
//import { IOrderDetail } from "../my-orders-details/types";

interface IProduct{
    productId : string, 
    productQty : number,
    orderStatus? : string, 
    totalAmount?:number, 
    Payment? : {
        paymentMethod : PaymentMethod, 
        
    } 
}
export interface IOrderItems extends IProduct{
    id : string,
    orderId:string
}

export interface IOrder{
    status : Status, 
    items : IOrderItems[], 
    khaltiUrl : string | null,
    orderDetails : IOrderDetail[]

}

// export enum PaymentMethod{
//     Esewa = "esewa", 
//     Khalti = "khalti", 
//     Cod = "cod"
// }

export type PaymentMethod = 'esewa' | 'khalti' | 'cod';

export const PaymentMethod = {
    Esewa: 'esewa' as PaymentMethod,
    Khalti: 'khalti' as PaymentMethod,
    Cod: 'cod' as PaymentMethod,
} as const;

export interface IData{
    firstName : string, 
    lastName : string, 
    phoneNumber : string, 
    email : string, 
    city : string, 
    zipCode : string, 
    state : string, 
    addressLine : string, 
    totalAmount : number, 
    paymentMethod : PaymentMethod, 
    products : IProduct[]
}