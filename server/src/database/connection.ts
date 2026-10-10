// import { Sequelize } from 'sequelize-typescript'
// import { envConfig } from '../config/config.js'

// // const sequelize = new Sequelize(envConfig.connectionString, {
// //   dialect: 'postgres',
// //   dialectOptions: {
// //     ssl: {
// //       require: true,
// //       rejectUnauthorized: false
// //     }
// //   }
// // })

// const sequelize = new Sequelize(envConfig.connectionString as string,{
//     models : [__dirname + '/models']
// })

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established with the postgres database with supabase successfully!!!')
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error)
//   })

//   sequelize.sync({force : false}).then(()=>{
//     console.log("local changes injected to database successfully")
// })

// export default sequelize

import { Sequelize } from 'sequelize-typescript'
import { envConfig } from '../config/config'
import Product from './models/productModel'
import Category from './models/categoryModel'
import Order from './models/orderModel'
import User from './models/userModel'
import Payment from './models/paymentModel'
import OrderDetails from './models/orderDetails'
import Cart from './models/cartModel'

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [__dirname + '/models']
})

try {
    sequelize.authenticate()
        .then(() => {
            console.log(" Connected !!! 😀 ")
        })
        .catch(err => {
            console.log(" ERROR 😝 : ", err)
        })
} catch (error) {
    console.log(error)
}

sequelize.sync({ force: false, alter: true }).then(() => {   /// force : false means it will not drop the tables if they already exist, it will only create new tables if they don't exist. If you set force : true, it will drop the existing tables and create new ones, which can lead to data loss. So it's safer to use force : false in production environments.
    console.log(" synced !! ")
})

// relationships // 
Product.belongsTo(Category,{foreignKey: 'categoryId'})
Category.hasOne(Product,{foreignKey: 'categoryId'})

//User X Order
//order table ma userid foreign key aayo
User.hasMany(Order,{foreignKey:'userId'})
Order.belongsTo(User,{foreignKey:'userId'})

// Payment table ma orderId
Payment.hasOne(Order,{foreignKey:"paymentId"})
Order.belongsTo(Payment,{foreignKey:"paymentId"})


//OrderDetails Table ma OrderId

Order.hasOne(OrderDetails,{foreignKey:"orderId"})
OrderDetails.belongsTo(Order,{foreignKey:"orderId"})

//OrderDetails Table ma  ProductID

Product.hasMany(OrderDetails,{foreignKey:"productId"})
OrderDetails.belongsTo(Product,{foreignKey:"productId"})

//Cart table ma Userid 

User.hasOne(Cart,{foreignKey:"userId"})
Cart.belongsTo(User,{foreignKey:"userId"})

//Cart table ma ProductId
Product.hasMany(Cart,{foreignKey:"productId"})
Cart.belongsTo(Product,{foreignKey:"productId"})

export default sequelize


//true baneko chai hamile model ma kehi change gare vane tya supabse table ma pani change hunxa, false baneko chai hamile model ma kehi change gare vane tya supabse table ma change hudaina, tya hamile manually change garnu parxa. So it's safer to use false in production environments.