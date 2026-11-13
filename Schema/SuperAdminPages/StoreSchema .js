const mongoose=require("mongoose")





const storeSchema=mongoose.Schema({

    name:{
        type:String
    },
    slug:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    typeStore:{
        type:String
    },
    area:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    isActive:{
        type:Boolean,
        default:true
    },

    openingTime:{
        type:String,
    },
    closingTime:{
        type:String,
    },
    ratingsQuantity:{
        type:Number,
    },
    minOrder:{
        type:Number,
    },
    estimatedDeliveryTime:{
        type:String,
    },


},{timestamps:true})


module.exports=mongoose.model("store",storeSchema)