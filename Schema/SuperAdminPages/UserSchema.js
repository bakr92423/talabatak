const mongoose=require("mongoose")





const UserSchema=mongoose.Schema({

    name:{
        type:String
    },
    userID:{
        type:String
    },
    role:{
        type:String
    },
    store:{
        type:mongoose.Schema.ObjectId,
        ref:"store"
    },
    password:{
        type:String
    },

},{timestamps:true})


module.exports=mongoose.model("user",UserSchema)