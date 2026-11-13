const CATEGORY=require("../../Schema/AdminPages/CategorySchema")
const USER=require("../../Schema/SuperAdminPages/UserSchema")
const slug=require("slugify")





const addCategory=async(req,res)=>{
    console.log(req.body);
    const {name,image,store}=req.body
    
    const generateSlug=slug(name,{lower:true,strict:true,locale:"ar"})
    const newCategory= CATEGORY({name,slug:generateSlug,store,image})
    await newCategory.save()
    res.json({msg:"تم اضافة القسم",data:newCategory})
}

const getCategory=async(req,res)=>{

 try{
       const id=req.params.id
    const category= await CATEGORY.findById(id)

    if(!category){
        return res.json({msg:" القسم غير موجود"})
    }

     res.json({data:category})

 }catch(error){
    res.json({msg:"خطأ في جلب  القسم"})

 }

}
const getCategoryes=async(req,res)=>{

 try{
     if(req.params.id){
     const id = req.params.id
          const user = await USER.findById(id)
    
          if (!user || !user.store) {
            return res.json({ msg: "لا يوجد طلبات", data: [] })
          }
    
          const storeId = user.store
    if(storeId){

        const categoryes= await CATEGORY.find({store:storeId})
        res.json({result:categoryes.length,data:categoryes})
    }else{
        return res.json({msg:"لايوجد منتجات"})
    }
  }
  else{
     const categoryes= await CATEGORY.find()

     res.json({result:categoryes.length,data:categoryes})
  }

 }catch(error){
    res.json({msg:"خطأ في جلب الاقسام"})

 }

}

const updateCategory=async(req,res)=>{

 try{
    const {name,image,store}=req.body
    const generateSlug=slug(name,{lower:true,strict:true,locale:"ar"})
       const id=req.params.id
    const category= await CATEGORY.findById(id)

    if(!store){
        return res.json({msg:" المتجر غير موجود"})
    }
    const data={name,slug:generateSlug,image,store}
    const updatedCategory= await CATEGORY.findOneAndUpdate({_id:id},data,{new:true})

     res.json({msg:"تم تحديث  القسم",data:updatedCategory})

 }catch(error){
    res.json({msg:"خطأ في تحديث  القسم"})

 }

}
const deleteCategory=async(req,res)=>{

 try{
       const id=req.params.id
    const category= await CATEGORY.findById(id)

    if(!category){
        return res.json({msg:" القسم غير موجود"})
    }
     await CATEGORY.findByIdAndDelete(id)

     res.json({msg:"تم حذف  القسم"})

 }catch(error){
    res.json({msg:"خطأ في حذف  القسم"})

 }

}






module.exports={
    addCategory,
    getCategory,
    getCategoryes,
    updateCategory,
    deleteCategory
}