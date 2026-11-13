const USER=require("../../Schema/SuperAdminPages/UserSchema")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



const addUser=async(req,res)=>{
    const {name,userID,role,store,password}=req.body
    const hashPassword=await bcrypt.hash(password,10)
    const newUser=USER({name,userID,role,store,password:hashPassword})
    await newUser.save()
    res.json({msg:"تم انشاء المستخدم بنجاح",data:newUser})
}


const getUser=async(req,res)=>{
    const id=req.params.id
    const user=await USER.findById(id).populate("store")
    if(!user){
        return res.json({msg:"المستخدم غير موجود"})
    }
    res.json({data:user})
}
const getUsers=async(req,res)=>{
    const users=await USER.find().populate("store")

    res.json({result:users.length,data:users})
    console.log(users);
    
}

const updateUser=async(req,res)=>{
    const {name,userID,role,store,password}=req.body
    const id=req.params.id
    const user=await USER.findById(id)
    if(!user){
        return res.json({msg:"المستخدم غير موجود"})
    }

    const updateData={name,userID,role,store,password}
    if(password && password.trim() !==""){
        updateData.password=await bcrypt.hash(password,10)
    }
    const updatedUser=await USER.findOneAndUpdate({_id:id},{$set:updateData})
    res.json({msg:"تم التحديث بنجاح",data:updatedUser})
}
const deleteUser=async(req,res)=>{
    const id=req.params.id
    const user=await USER.findById(id)
    if(!user){
        return res.json({msg:"المستخدم غير موجود"})
    }
    await USER.findByIdAndDelete(id)
    res.json({msg:"تم الحذف بنجاح"})
}


const login=async(req,res)=>{
   try{
     const {userID,password}=req.body
    const user=await USER.findOne({userID})
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.json({msg:"الرجاء التأكد من اسم المستخدم وكلمة المرور"})
    }

    const token=jwt.sign({id:user._id,role:user.role,name:user.name},process.env.JWT_SECRET)
    res.json({msg:"تم تسجيل الدخول بنجاح",data:user,token:token})

   }catch(error){
    return res.json({msg:"الرجاء التأكد من اسم المستخدم وكلمة المرور"})

   }

}


const protect=async(req,res,next)=>{

    if(!req.headers.authorization){
        return(res.json({msg:"خطأ في تسجيل الدخول"}))
    }

    const token=req.headers.authorization.split(" ")[1]
    const decoded= jwt.verify(token,process.env.SECRETKEY)
    req.user=decoded.name
    const checkUser=await USER.findById(decoded.id)
    if(!checkUser){
        return(res.json({msg:"هذا الحساب غير موجود"}))
    }

    req.user=checkUser
    next()
}



module.exports={
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    protect,
    login
}





