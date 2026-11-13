const mongoose=require("mongoose")





const categorySchema=mongoose.Schema({

    name:{
        type:String
    },
    slug:{
        type:String
    },
    image:{
        type:String
    },
    store:{
        type:mongoose.Schema.ObjectId,
        ref:"store"
    },


},{timestamps:true})


module.exports=mongoose.model("category",categorySchema)