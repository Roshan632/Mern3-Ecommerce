import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { envConfig } from "../config/config";
import UserController from "../controllers/userController";
import User from "../database/models/userModel";
export enum Role {
    Customer = "customer",
    Admin = "admin"
}

interface IExtendedRequest extends Request{
    user? : {
        username:string,
        email:string,
        role:string,
        password:string,
        id:string
    }
}
class UserMiddleware{
    async isUserLoggedIn(req:IExtendedRequest,res:Response,next:NextFunction):Promise<void>{    //next jaile middleware ma hunuparxa
        // receive token 
       const token =  req.headers.authorization // manish
       if(!token){
        res.status(403).json({
            message : "Token must be provided"
        })
        return
       }
        // validate token 
       jwt.verify(token,envConfig.jwtSecretKey as string, async (err,result:any)=>{
        if(err){
            res.status(403).json({
                message : "Invalid token !!!"
            })
        }else{
            console.log(result) //{userId : 123123123}
           const userData = await User.findByPk(result.userId) //db ma user xa ki xaina check garna
              if(!userData){
                res.status(404).json({
                    message : "No user with that userId exists"
                })
                return 
              }
           
            req.user = userData
            next() //next last ma halnu parxa kinaki routing ma next route pani chalaunu parxa like category Routes ma herda hunxa
            //next chalaunu parxa vanna le next function
            //ani middleware bichma rakhnu parxa..  
        }
       })

    }
     accessTo(...roles:Role[]){ 
        return (req:IExtendedRequest,res:Response,next:NextFunction)=>{
            let userRole = req.user?.role as Role
            console.log(userRole,"ROle")
           if(!roles.includes(userRole)){
                res.status(403).json({
                     message : "You dont have permission haiii!!"
                })
                return
            }
            next()
        }
    }
}


export default new UserMiddleware