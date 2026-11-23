const mongoose=require("mongoose")

const OrdersSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"register"
    },
    store:{
        type:mongoose.Schema.ObjectId,
        ref:"store"
    },
    orderItems:[{
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"product"
        },
        quantity:{
            type:Number,
            min:1
        },
        price:{
            type:Number,
        },
        // الجديد: الحجم
        size:{
            type:String,
            default: null
        },
        variant:{
            type:String,
            default: null
        },
        note:{
            type:String,
            default:""
        },
        // اسم المنتج وقت الطلب - عشان لو المنتج اتمسح يفضل الاسم موجود
        name:{
            type:String,
            default: ""
        },
    }],
    totalOrder:{
     type:Number
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    customerName:{
        type:String,
        default: ""
    },
    name:{
        type:String,
        default: ""
    },
    location:{
      type:mongoose.Schema.ObjectId,
        ref:"location"
    },
    status:{
        type:String,
        default:"pending"
    },
    delivery:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    lockedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        default:null
    },
    lockedAt:{
        type:Date,
        default:null
    },
    deliveryFee:{
        type:Number
    }
},{timestamps:true})

module.exports=mongoose.model("order",OrdersSchema)
