const mongoose=require("mongoose")





const registerSchema=mongoose.Schema({

    name:{
        type:String
    },
    phone:{
        type:String
    },


},{timestamps:true})


module.exports=mongoose.model("register",registerSchema)