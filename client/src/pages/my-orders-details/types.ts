export type OrderStatus =
    | "preparation"
    | "ontheway"
    | "delivered"
    | "pending"
    | "cancelled";

export const OrderStatus = {
    Preparation: "preparation" as OrderStatus,
    Ontheway: "ontheway" as OrderStatus,
    Delivered: "delivered" as OrderStatus,
    Pending: "pending" as OrderStatus,
    Cancelled: "cancelled" as OrderStatus,
} as const;

export type PaymentMethod = "khalti" | "esewa" | "cod";

export const PaymentMethod = {
    Khalti: "khalti" as PaymentMethod,
    Esewa: "esewa" as PaymentMethod,
    COD: "cod" as PaymentMethod,
} as const;

export type PaymentStatus = "paid" | "unpaid";

export const PaymentStatus = {
    Paid: "paid" as PaymentStatus,
    Unpaid: "unpaid" as PaymentStatus,
} as const;

export interface IOrderDetail {
    id: string,
    quantity: number,
    createdAt: string,
    
    orderId: string,
    productId: string,
    Order: {
        orderStatus: OrderStatus,
        AddressLine: string,
        City: string,
        State: string,
        totalAmount: number,
        phoneNumber: string,
        firstName : string, 
        lastName : string,
        userId : string, 
        Payment: {
            paymentMethod: PaymentMethod,
            paymentStatus: PaymentStatus
        }
    },
    Product: {
        productImageUrl: string,
        productName: string,
        productPrice: number,
        Category: {
       
            categoryName: string,
      
        }
    }
}