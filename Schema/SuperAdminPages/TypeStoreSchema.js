const mongoose=require("mongoose")





const typeStoreSchema=mongoose.Schema({

    name:{
        type:String
    },
    slug:{
        type:String
    },
    image:{
        type:String
    },


},{timestamps:true})


module.exports=mongoose.model("typeStore",typeStoreSchema)