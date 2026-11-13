const express=require("express")
const mongoose=require("mongoose")
const app=express()
const UserRoute=require("./Route/SuperAdminPages/UserRout")
const LoginRoute=require("./Route/SuperAdminPages/LoginRoute")
const TypeStoreRoute=require("./Route/SuperAdminPages/TypeStoreRoute")
const StoreRoute=require("./Route/SuperAdminPages/StoreRoute")
const Location=require("./Route/SuperAdminPages/LocationRoute")
const PRODUCT=require("./Route/AdminRoute/ProductRoute")
const CATEGORY=require("./Route/AdminRoute/CategoryRoute")
const ORDER=require("./Route/AdminRoute/OrdersRoute")
const REGISTER=require("./Route/AdminRoute/RegisterRoute")
const ADS=require("./Route/SuperAdminPages/AdsRoute")



const UPLOAD=require("./Route/Upload")
const cors=require("cors")
app.use(cors())
app.use(express.json())
require("dotenv").config() 




app.use("/api/user",UserRoute)
app.use("/api/login",LoginRoute)
app.use("/api/typeStore",TypeStoreRoute)
app.use("/api/store",StoreRoute)
app.use("/api/location",Location)
app.use("/api/category",CATEGORY)
app.use("/api/product",PRODUCT)
app.use("/api/order",ORDER)
app.use("/api/register",REGISTER)
app.use("/api/ads",ADS)
app.use('/api/upload',UPLOAD)


















let URL=process.env.URLDB
let port=process.env.PORT

mongoose.connect(URL).then(()=>{
    console.log("the Database Connecting");
})

app.listen(port||9000,()=>{
    console.log("the server starting");

})




module.exports=app;