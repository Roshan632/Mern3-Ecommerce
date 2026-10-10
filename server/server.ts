import adminSeeder from './adminSeeder.js';
import app from './src/app.js';

import { envConfig } from './src/config/config.js';
import categoryController from './src/controllers/categoryController.js';
import {Server} from 'socket.io'
import User from './src/database/models/userModel.js';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Role } from './src/middleware/userMiddleware.js';
import jwt from 'jsonwebtoken'
import { Socket } from 'node:dgram';
import Order from './src/database/models/orderModel.js';
import { OrderStatus } from './src/globals/types/index.js';
function startServer(){
   const port = envConfig.port || 4000;
   
const server = app.listen(port, () => {
  categoryController.seedCategory()
  console.log(`Server is running on port ${port}`);
  adminSeeder()  // Admin seeding function is called here to ensure that the admin user is created when the server starts. This way, we can guarantee that the admin user exists in the database before any requests are made to the server.
});
const socketOrigins = (process.env.CLIENT_URL ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const io = new Server(server, {
  cors: {
    origin: socketOrigins,
  },
})

let onlineUsers :{socketId:string,userId:string,role:string}[]=[]

let addToOnlineUsers=(socketId:string,userId:string,role:string)=>{
  onlineUsers=onlineUsers.filter((user)=>user.userId !== userId)
  onlineUsers.push({socketId,userId,role})
}
io.on("connection",(socket)=>{
 //console.log("Client connected vayo hai!!!")  //postman ma socket.io xaina
   console.log("connected")
        const {token} = socket.handshake.auth // jwt token 
        console.log(token,"TOKEN")
 if(token){
  console.log(token)

       jwt.verify(token as string,envConfig.jwtSecretKey as string, async (err:any,result:any)=>{
        if(err){
          socket.emit("error",err)
            
        }else{
          const userData = await User.findByPk(result.userId) 
          if(!userData){
            socket.emit("error","No user found with that token")
             return 

          }
            console.log(socket.id,result.userId,userData.role)
          addToOnlineUsers(socket.id,result.userId,userData.role)
          console.log(onlineUsers)
              
               
              

        }
           
           
            
        
       })

  }else{
                console.log("triggered")
                socket.emit("error","Please provide token")
            }
            console.log(onlineUsers)
 socket.on("updateOrderStatus",async(data)=>{
  const {status,orderId,userId}=data
  console.log(data,"USS")
  const findUser = onlineUsers.find(user=>user.userId==userId)
 const datas=await Order.findAll()
 console.log(datas)
   
   
    await Order.update(
      {
        OrderStatus:status
      },
      {
        where:{
        id:orderId
      }

      }
      
      
    )


if(findUser){
  console.log(findUser.socketId,"FS")
                io.to(findUser.socketId).emit("statusUpdated",data)



   
  }else{
    socket.emit("error","User is not online!!!")
  }
 })

})
}




startServer();


//on means to send
//emit means listening in socket io

