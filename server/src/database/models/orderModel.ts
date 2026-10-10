import {Table,Column,Model,DataType, AllowNull} from 'sequelize-typescript'
import { OrderStatus } from '../../globals/types'

@Table({
    timestamps : true,
    tableName : "orders",
    modelName : "Order"
})
class Order extends Model{
    @Column({
        primaryKey : true,
        type:DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @Column({
        type : DataType.STRING,
        allowNull : false,
        validate : {
            len:{
                args : [10,10],
                msg : "Phone number must be between 10 and 10 characters"
            }
        }

    })
    declare phoneNumber : string

    @Column({
        type : DataType.STRING,
        //allowNull : false,
        validate : {
            len:{
                args : [3,255],
                msg : "Address must be between 3 and 255 characters"
            }
        }
    })
    declare AddressLine : string

    @Column({
        type : DataType.STRING,
        //allowNull: false
    })
    declare City : string
    @Column({
        type : DataType.STRING,
        //allowNull: false
    })
    declare State : string

     @Column({
        type : DataType.STRING,
        //allowNull: false
    })
    declare zipCode : string

    @Column({
        type : DataType.FLOAT,
        allowNull: false
    })
    declare totalAmount : number

    @Column({
        type : DataType.UUID,
        allowNull : true
    })
    declare paymentId : string | null

    @Column({
        type : DataType.ENUM(OrderStatus.Cancelled,
            OrderStatus.Delivered,
            OrderStatus.Ontheway,
            OrderStatus.Pending,
            OrderStatus.Preparation),
            defaultValue: OrderStatus.Pending
    })
        declare orderStatus : string

    @Column({
            type:DataType.STRING,
            
            allowNull:false,
            defaultValue:"Anonymous"
        })
        declare firstName:string
      @Column({
            type:DataType.STRING,
            allowNull:false,
            defaultValue:"Anonymous"
        })
        declare lastName:string
     @Column({
            type:DataType.STRING,
            allowNull:false,
            defaultValue:"anonymous@gmail.com"
        })
        declare email:string



    }

    export default Order




    //Always DO VALIDATION IN DATABASE IN MODEL
     // MAINTAIN "FAT MODEL THIN CONTROLLER"