import { Request, Response } from "express";
import { Op } from "sequelize";
import Order from "../database/models/orderModel";
import OrderDetails from "../database/models/orderDetails";
import { PaymentMethod, PaymentStatus, OrderStatus } from "../globals/types";
import Payment from "../database/models/paymentModel";
import axios from 'axios'
import { promises } from "node:dns";
import Cart from "../database/models/cartModel";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";
import crypto from "node:crypto";

interface IProduct{
    productId : string,
    productQty : number
}

interface OrderRequest extends Request{
    user? : {
        id : string
    }
}

class OrderWithPaymentId extends Order{
  declare paymentId : string | null 
}

class OrderController{
    private static asString(value:unknown):string{
      if(Array.isArray(value)){
        return String(value[0] || "")
      }
      return typeof value === "string" ? value : ""
    }

    static async createOrder(req:OrderRequest,res:Response):Promise<void>{
        const userId =  req.user?.id
        const {phoneNumber,addressLine,city,state,firstName,lastName,email,zipCode,totalAmount,paymentMethod} = req.body 
        const products:IProduct[] = req.body.products
        if(!phoneNumber || !addressLine || !city || !state || !zipCode || !totalAmount || products.length == 0 || !firstName || !lastName || !email){
            res.status(400).json({
                message : "Please provide phoneNumber,shippingAddress,totalAmount,products"
            })
            return
        }
        // for order 
       
        let data;
         const paymentData = await Payment.create({
     
          paymentMethod : paymentMethod, 
      })
      const orderData = await Order.create({
        phoneNumber, 
        city, 
        state, 
        zipCode, 
        addressLine,
        totalAmount, 
        userId, 
        firstName, 
        lastName, 
        email, 
        paymentId : paymentData.id
    })

        // for orderDetails
        // console.log(orderData,"OrderData!!")
        // console.log(products)
            for (const product of products){
                data=await OrderDetails.create({
                        quantity : product.productQty,
                        productId : product.productId,
                        orderId : orderData.id
                })
                await Cart.destroy({
                    where:{
                        
                        productId : product.productId,
                        userId : userId

                    }
                    
                })
            }
      // for payment 
    //   let paymentData;
    //   if(paymentMethod == PaymentMethod.COD){
        
    if (paymentMethod == PaymentMethod.Khalti){
        // khalti logic
                const data = {
                        return_url: "http://localhost:5173/", //after successful
                        website_url: "http://localhost:5173/", //your home page
                        amount: totalAmount * 100,  //khalti accepts in paisa so
                        purchase_order_id: orderData.id, //your orderId ie unique hunu paro
                        purchase_order_name: "order_" + orderData.id  //Your OrderId Name same unique hunu parxa
                }

                try{
                    const khaltiRes = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", data, {
                        headers: {
                            Authorization: "Key 937f47f08a504d26bc548980bfc2db0f"
                        }
                    })

                    const khaltiResponse = khaltiRes.data
                    paymentData.pidx = khaltiResponse.pidx   //pidx is unique identifier for payment transaction. with pidx we should do verification for payment after initiation success
                    await paymentData.save()

                    res.status(200).json({
                        message: "Khalti payment initiated and Order Created successfully!!!",
                        url: khaltiResponse.payment_url,
                        pidx:khaltiResponse.pidx,
                        data

                        
                    
                            

                        
                    })
                    return
                }catch(err:any){
                    console.error("Khalti init error:", err?.response?.data || err.message || err)
                    res.status(500).json({ message: "Failed to initiate Khalti payment" })
                    return
                }
      }else if (paymentMethod == PaymentMethod.Esewa){
        // esewa logic
        const transactionUuid = orderData.id
        const productCode = "EPAYTEST"
        const totalAmountValue = Number(totalAmount)
        const signedFieldNames = "total_amount,transaction_uuid,product_code"
        const signature = crypto
          .createHmac("sha256", "8gBm/:\&EnhH.1/q")
          .update(`total_amount=${totalAmountValue},transaction_uuid=${transactionUuid},product_code=${productCode}`)
          .digest("base64")

        paymentData.pidx = transactionUuid
        await paymentData.save()

        res.status(200).json({
          message: "eSewa payment initiated and Order Created successfully!!!",
          url: `${req.protocol}://${req.get("host")}/api/order/esewa/checkout/${transactionUuid}`,
          esewaUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
          formData: {
            amount: totalAmountValue.toString(),
            tax_amount: "0",
            total_amount: totalAmountValue.toString(),
            transaction_uuid: transactionUuid,
            product_code: productCode,
            product_service_charge: "0",
            product_delivery_charge: "0",
            success_url: `${req.protocol}://${req.get("host")}/api/order/esewa/success`,
            failure_url: `${req.protocol}://${req.get("host")}/api/order/esewa/failure`,
            signed_field_names: signedFieldNames,
            signature
          }
        })
        return

      }else{
        res.status(200).json({
                message : "Order created successfully",
                data
                
            })

      }
        

      
            
    }

    static async redirectToEsewa(req:Request,res:Response):Promise<void>{
      const transactionUuid = OrderController.asString(req.params.transactionUuid)
      const payment = await Payment.findOne({
        where: { pidx: transactionUuid, paymentMethod: PaymentMethod.Esewa }
      })
      if(!payment){
        res.status(404).send("eSewa payment transaction not found")
        return
      }

      const order = await Order.findOne({ where: { paymentId: payment.id } })
      if(!order){
        res.status(404).send("Order for eSewa payment not found")
        return
      }

      const totalAmountValue = Number(order.totalAmount)
      const fields:Record<string,string> = {
        amount: totalAmountValue.toString(),
        tax_amount: "0",
        total_amount: totalAmountValue.toString(),
        transaction_uuid: transactionUuid,
        product_code: "EPAYTEST",
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: `${req.protocol}://${req.get("host")}/api/order/esewa/success`,
        failure_url: `${req.protocol}://${req.get("host")}/api/order/esewa/failure`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: crypto
          .createHmac("sha256", "8gBm/:\&EnhH.1/q")
          .update(`total_amount=${totalAmountValue},transaction_uuid=${transactionUuid},product_code=EPAYTEST`)
          .digest("base64")
      }
      const inputs = Object.entries(fields)
        .map(([name,value]) => `<input type="hidden" name="${name}" value="${value.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}">`)
        .join("")

      res.type("html").send(`<!doctype html><html><body><form id="esewa" method="POST" action="https://rc-epay.esewa.com.np/api/epay/main/v2/form">${inputs}</form><script>document.getElementById("esewa").submit()</script></body></html>`)
    }

    static async handleEsewaSuccess(req:Request,res:Response):Promise<void>{
      const encodedData = req.query.data || req.body?.data
      let decodedData:Record<string,unknown> = {}
      if(encodedData){
        try{
          decodedData = JSON.parse(Buffer.from(String(encodedData), "base64").toString("utf8"))
        }catch(error){
          console.error("Unable to decode eSewa callback data:", error)
        }
      }
      const callbackData = { ...req.query, ...(req.body || {}), ...decodedData }
      const transactionUuid = OrderController.asString(callbackData.transaction_uuid || callbackData.oid)
      const order = transactionUuid ? await Order.findByPk(transactionUuid) : null
      const payment = order?.paymentId
        ? await Payment.findByPk(order.paymentId)
        : await Payment.findOne({
            where: { pidx: transactionUuid, paymentMethod: PaymentMethod.Esewa }
          })
      if(!payment){
        OrderController.renderPaymentPage(res, false, "Payment transaction not found")
        return
      }

      if(payment.paymentMethod !== PaymentMethod.Esewa || !order){
        OrderController.renderPaymentPage(res, false, "Order for payment transaction not found")
        return
      }

      try{
        const response = await axios.get("https://rc-epay.esewa.com.np/api/epay/transaction/status/", {
          params: {
            product_code: "EPAYTEST",
            total_amount: Number(order.totalAmount),
            transaction_uuid: transactionUuid
          }
        })
        if(response.data.status !== "COMPLETE"){
          OrderController.renderPaymentPage(res, false, "eSewa could not verify this payment")
          return
        }
        payment.paymentStatus = PaymentStatus.Paid
        await payment.save()
        res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/`)
      }catch(error){
        console.error("eSewa callback verification error:", error)
        OrderController.renderPaymentPage(res, false, "Payment verification failed")
      }
    }

    static handleEsewaFailure(req:Request,res:Response):void{
      OrderController.renderPaymentPage(res, false, "Payment was cancelled or could not be completed")
    }

    private static renderPaymentPage(res:Response, success:boolean, message:string, orderId?:string, transactionUuid?:string):void{
      const title = success ? "Order confirmed" : "Payment not completed"
      const details = success
        ? `<p class="muted">Order ID</p><strong>${orderId}</strong><p class="muted">eSewa transaction</p><strong>${transactionUuid}</strong>`
        : "<p>Go back to your cart and try again with another payment method.</p>"
      res.type("html").send(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{margin:0;background:#f4f7f6;color:#173b35;font-family:Arial,sans-serif;display:grid;place-items:center;min-height:100vh}.card{background:#fff;max-width:460px;width:calc(100% - 40px);padding:42px;border-radius:16px;box-shadow:0 16px 45px #173b3520}h1{margin:0 0 12px;font-size:30px}.mark{font-size:46px;margin-bottom:18px;color:${success ? "#16805c" : "#bc5a3d"}}p{line-height:1.6}.muted{margin:22px 0 4px;color:#68807a;font-size:12px;text-transform:uppercase;letter-spacing:1px}strong{word-break:break-word}a{display:inline-block;margin-top:28px;background:#173b35;color:#fff;padding:13px 20px;border-radius:8px;text-decoration:none}</style></head><body><main class="card"><div class="mark">${success ? "&#10003;" : "!"}</div><h1>${title}</h1><p>${message}</p>${details}<a href="/">Continue shopping</a></main></body></html>`)
    }

   static async verifyTransaction(req:OrderRequest,res:Response):Promise<void>{
      const {pidx, transactionUuid}= req.body
      const paymentIdentifier = OrderController.asString(pidx || transactionUuid)
      if(!paymentIdentifier){
            res.status(400).json({
          message:"Please provide pidx or transactionUuid"
            })
            return
        }
      const payment = await Payment.findOne({
        where: { pidx: paymentIdentifier }
      })
      if(!payment){
        res.status(404).json({
          message:"Payment transaction not found"
        })
        return
      }
      const order = await Order.findOne({
        where: { paymentId: payment.id }
      })
      if(!order){
        res.status(404).json({
          message:"Order for payment transaction not found"
        })
        return
      }

      if(payment.paymentMethod === PaymentMethod.Esewa){
        const response = await axios.get("https://rc-epay.esewa.com.np/api/epay/transaction/status/", {
          params: {
            product_code: "EPAYTEST",
            total_amount: Number(order.totalAmount),
            transaction_uuid: paymentIdentifier
          }
        })
        const data = response.data
        if(data.status === "COMPLETE"){
          payment.paymentStatus = PaymentStatus.Paid
          await payment.save()
          res.status(200).json({
            message:"eSewa payment verified successfully!!!"
          })
        }else{
          res.status(200).json({
            message:"eSewa payment not verified or cancelled"
          })
        }
        return
      }
        const response=await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{
        pidx : paymentIdentifier
        },{
            headers : {
                Authorization: "Key 937f47f08a504d26bc548980bfc2db0f"

            }
        })
        console.log(response)
        const data = response.data
        if(data.status === "Completed"){
            await Payment.update({paymentStatus:PaymentStatus.Paid},{
                where :{
                pidx:paymentIdentifier
                }
            })
            res.status(200).json({
                message:"Payment Verified Successfully!!!"
            })

        }else{
            res.status(200).json({
                message:"Payment not verified or cancelled"
            })
        }
    }
    static async fetchMyOrders(req:OrderRequest,res:Response):Promise<void>{
        const userId=req.user?.id
        const orders=await Order.findAll({
            where:{
                userId
            },
            attributes:['totalAmount','id','orderStatus'],
            include:{
                model:Payment,
                attributes:["paymentMethod","paymentStatus"]

            }
        })
        if(orders.length>0){
            res.status(200).json({
                message:"Orders fetched successfully!",
                data:orders
            })
        }else{
            res.status(404).json({
                message:"No order found",
                data:[]
            })
        }
    }
    static async fetchAllOrders(req:OrderRequest,res:Response):Promise<void>{
      const search = String(req.query.search || "").trim()
      const whereClause = search ? {
        [Op.or]: [
          { id: search },
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } }
        ]
      } : undefined

      const orders = await Order.findAll({
        where: whereClause,
        attributes : ["totalAmount","id","orderStatus"], 
        include : {
          model : Payment, 
          attributes : ["paymentMethod", "paymentStatus"]
        }
      })
      if(orders.length > 0){
        res.status(200).json({
          message : "Order fetched successfully", 
          data : orders 
        })
      }else{
        res.status(404).json({
          message : "No order found", 
          data : []
        })
      }
    }

    static async fetchMyOrderDetail(req:OrderRequest,res:Response):Promise<void>{
        const orderId=req.params.id
        const userId=req.user?.id
        const orders=await OrderDetails.findAll({
            where:{
                orderId,
            },
            include:[{
                model:Order,
                include:[
                    {
                        model:Payment,
                        attributes:["paymentMethod","paymentStatus"]
                    }
                ],
                attributes:
                ["orderStatus","AddressLine","City","State","totalAmount","phoneNumber","firstName","lastName","userId"]
            },{
               model : Product, 
          include : [{
            model : Category
          }],  
            attributes : ["productImageUrl","productName","productPrice"]

            
            }]
        })
        if(orders.length>0){
            res.status(200).json({
                message:"Orders fetched successfully!",
                data:orders
            })
        }else{
            res.status(404).json({
                message:"No order found",
                data:[]
            })
        }
    }
    static async cancelMyOrder(req:OrderRequest,res:Response):Promise<void>{
      const userId = req.user?.id 
      const orderId = req.params.id 
      const [order] = await Order.findAll({
        where : {
          userId : userId, 
          id : orderId 
        }
      })
      if(!order){
        res.status(400).json({
          message : "No order with that Id"
        })
        return 
      }
      // check order status 
      if(order.orderStatus === OrderStatus.Ontheway || order.orderStatus === OrderStatus.Preparation){
        res.status(403).json({
          message : "You cannot cancelled order, it is on the way or preparation mode"
        })
        return
      }
      await Order.update({orderStatus : OrderStatus.Cancelled},{
        where : {
          id : orderId
        }
      })
      res.status(200).json({
        message : "Order cancelled successfully"
      })
    }
    static async changeOrderStatus(req:OrderRequest,res:Response) : Promise<void>{
      const rawOrderId = req.params.id
      const orderId = Array.isArray(rawOrderId) ? rawOrderId[0] : rawOrderId
      const {orderStatus, paymentStatus} = req.body
      if(!orderId || (!orderStatus && !paymentStatus)){
        res.status(400).json({
          message : "Provide an order status or payment status to update"
        })
        return
      }

      if (orderStatus && !Object.values(OrderStatus).includes(orderStatus)) {
        res.status(400).json({ message: "Invalid order status" })
        return
      }
      if (paymentStatus && !Object.values(PaymentStatus).includes(paymentStatus)) {
        res.status(400).json({ message: "Invalid payment status" })
        return
      }

      const order = await Order.findByPk(orderId)
      if (!order) {
        res.status(404).json({ message: "Order not found" })
        return
      }

      const payment = order.paymentId ? await Payment.findByPk(order.paymentId) : null
      if (paymentStatus && !payment) {
        res.status(404).json({ message: "Payment record not found for this order" })
        return
      }

      if (orderStatus) await order.update({ orderStatus })
      if (paymentStatus && payment) await payment.update({ paymentStatus })

      res.status(200).json({
        message : "Order updated successfully",
        data: {
          id: order.id,
          orderStatus: order.orderStatus,
          totalAmount: order.totalAmount,
          Payment: payment ? {
            paymentMethod: payment.paymentMethod,
            paymentStatus: payment.paymentStatus,
          } : null,
        },
      })
    }
    static async deleteOrder(req:OrderRequest, res:Response) : Promise<void>{

      const rawOrderId = req.params.id
      const orderId = Array.isArray(rawOrderId) ? rawOrderId[0] : rawOrderId
      if(!orderId){
        res.status(400).json({
          message : "Please provide orderId"
        })
        return
      }
      const order = await Order.findByPk(orderId) as OrderWithPaymentId | null
      if(!order){
        res.status(404).json({
          message : "You dont have that orderId order"
        })
        return
      }
      const paymentId = order.paymentId
      await OrderDetails.destroy({
        where : {
          orderId : orderId
        }
      })
      await Payment.destroy({
        where : {
          id : paymentId
        }
      })
      await Order.destroy({
        where : {
          id : orderId
        }
      })
      res.status(200).json({
        message : "Order delete successfully"
      })
    }

}

export default OrderController

/* 
{  
    shippingAddress : "", 
    phoneNumber : 912323333, 
    totalAmount : 1232, 
    products : [{
 productId : 89123123, 
 qty : 2 
},
 {productId : 123123, 
 qty : 1
}]
}
*/