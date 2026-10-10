
import {Request,Response} from 'express'
import Cart from '../database/models/cartModel'
import Product from '../database/models/productModel'
import Category from '../database/models/categoryModel'

interface AuthRequest extends Request{
    user?:{
        id:string
    }
}

class cartController{
    async addToCart(req:AuthRequest,res:Response){

        //userid,productid,quantity
        const userId=req.user?.id
        const {productId,quantity}=req.body
        if(!productId || !quantity){
            res.status(400).json({
                message:"Please provide productId and quantity"

            })
            return
        }

        //check if item already exists in user cart then same item if selected then only cart no is increases not adding or inserting new record again and again
        let userKoCartMaItemAlreadyXa = await Cart.findOne({
            where:{
                productId,
                userId
            }
        })
        if(userKoCartMaItemAlreadyXa){
            userKoCartMaItemAlreadyXa.quantity=userKoCartMaItemAlreadyXa.quantity + quantity
           await userKoCartMaItemAlreadyXa.save()
        }else {
            await Cart.create({
            userId,
            productId,
            quantity

        })
        }
        const cartData= await Cart.findAll({
            where:{
                userId
            },
            include:[     //include means joint in sql
                {
                    model:Product,
                    include:[
                        {
                            model:Category
                        }
                    ]
                }
            ]
        })
        res.status(200).json({
            message:"Product added to cart",
            data:cartData
        })
        
        
        //select * from cart where userid=? and productId=?
        

    }

    async getMyCartItems(req:AuthRequest,res:Response){
        const userId=req.user?.id
        const cartItems= await Cart.findAll({
            where:{
                userId
            },
            include :[
                {
                    model:Product,
                    attributes:['id','productName','productPrice','productImageUrl']
                }
            ]

        })
        if(cartItems.length === 0){
            res.status(404).json({
                message:"No items in the cart,its empty"
            })
        }else{
            res.status(200).json({
                message:"Cart items fetched successfully!!!",
                data:cartItems
            })
        }
    }
    async deleteMyCartItem(req:AuthRequest,res:Response){
        const userId = req.user?.id
        const productId = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId
        // check if product exists or not
        const product = await Product.findByPk(productId)
        if(!product){
            res.status(404).json({
                message:"No product with that ID"

            })
            return
        }
        await Cart.destroy({
            where :{
                productId,
                userId
            }
        })
        res.status(200).json({
            message:"Product from cart deleted successfully!!!"
        })
}

async updateCartItemQunatity(req:AuthRequest,res:Response){
    const userId=req.user?.id
    const {productId}=req.params
    const {quantity}=req.body
    if(!quantity){
        res.status(400).json({
            message:"Please provide quantity"
        })
        return
    }
    const cartItem =await Cart.findOne({
        where:{
            userId,
            productId
        }
    })
    if(!cartItem){
        res.status(404).json({
            message:"Cart ma tyo productId ko product xaina!!!"
        })
    }else{
        cartItem.quantity = quantity
        await cartItem.save()
        res.status(200).json({
            message:"Cart Updated"

        })
    }
}


}

export default new cartController

