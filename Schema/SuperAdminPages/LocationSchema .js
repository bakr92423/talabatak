const mongoose=require("mongoose")





const locationSchema=mongoose.Schema({

    name:{
        type:String
    },
    price:{
        type:Number
    }


},{timestamps:true})


module.exports=mongoose.model("location",locationSchema)