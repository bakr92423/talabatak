const registerUser=require("../../Schema/AdminPages/RegisterSchema")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



const addUser=async(req,res)=>{
    const {name,phone}=req.body
    const checkUser=await registerUser.findOne({phone:phone})
    if(checkUser){
        return  res.json({msg:"رقم الهاتف مسجل من قبل"})
    }
    const newUser=registerUser(req.body)
    await newUser.save()
    const token=jwt.sign({id:newUser._id,name:newUser.name,phone:newUser.phone},process.env.JWT_SECRET)
    res.json({msg:"تم انشاء المستخدم بنجاح",data:newUser,token:token})
}


const getUser=async(req,res)=>{
    const id=req.params.id
    const user=await registerUser.findById(id).populate("store")
    if(!user){
        return res.json({msg:"المستخدم غير موجود"})
    }
    res.json({data:user})
}
const getUsers=async(req,res)=>{
    const users=await registerUser.find()

    res.json({result:users.length,data:users})
    console.log(users);
    
}

const updateUser=async(req,res)=>{
    const id=req.params.id
    const user=await registerUser.findById(id)
    if(!user){
        return res.json({msg:"المستخدم غير موجود"})
    }
    const updatedUser=await USER.findOneAndUpdate({_id:id},{$set:{...req.body}})
    res.json({msg:"تم التحديث بنجاح",data:updatedUser})
}
const deleteUser=async(req,res)=>{
    const id=req.params.id
    const user=await registerUser.findById(id)
    if(!user){
        return res.json({msg:"المستخدم غير موجود"})
    }
    await USER.findByIdAndDelete(id)
    res.json({msg:"تم الحذف بنجاح"})
}


const register=async(req,res)=>{
    const {name,phone}=req.body
    const user=await registerUser.findOne({phone})
   const token=jwt.sign({id:user._id,name:user.name,phone:user.phone},process.env.JWT_SECRET)
    res.json({msg:"تم تسجيل الدخول بنجاح",data:user,token:token})

}






module.exports={
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    register
}