const TypeStore=require("../../Schema/SuperAdminPages/TypeStoreSchema")
const slug=require("slugify")





const addTypeStore=async(req,res)=>{
    console.log(req.body);
    const {name,image}=req.body
    
    const generateSlug=slug(name,{lower:true,strict:true,locale:"ar"})
    const newTypeStore= TypeStore({name,slug:generateSlug,image})
    await newTypeStore.save()
    res.json({msg:"تم اضافة نوع المتجر",data:newTypeStore})
}

const getTypeStore=async(req,res)=>{

 try{
       const id=req.params.id
    const typeStore= await TypeStore.findById(id)

    if(!typeStore){
        return res.json({msg:"نوع المتجر غير موجود"})
    }

     res.json({data:typeStore})

 }catch(error){
    res.json({msg:"خطأ في جلب نوع المتجر"})

 }

}
const getTypeStores=async(req,res)=>{

 try{
    const typeStores= await TypeStore.find()

     res.json({result:typeStores.length,data:typeStores})

 }catch(error){
    res.json({msg:"خطأ في جلب نوع المتجر"})

 }

}

const updateTypeStore=async(req,res)=>{

 try{
       const id=req.params.id
    const typeStore= await TypeStore.findById(id)

    if(!typeStore){
        return res.json({msg:"نوع المتجر غير موجود"})
    }
    const updatedTypeStore= await TypeStore.findOneAndUpdate({_id:id},{$set:{...req.body}})

     res.json({msg:"تم تحديث نوع المتجر",data:updatedTypeStore})

 }catch(error){
    res.json({msg:"خطأ في تحديث نوع المتجر"})

 }

}
const deleteTypeStore=async(req,res)=>{

 try{
       const id=req.params.id
    const typeStore= await TypeStore.findById(id)

    if(!typeStore){
        return res.json({msg:"نوع المتجر غير موجود"})
    }
     await TypeStore.findByIdAndDelete(id)

     res.json({msg:"تم حذف نوع المتجر"})

 }catch(error){
    res.json({msg:"خطأ في حذف نوع المتجر"})

 }

}





module.exports={
    addTypeStore,
    getTypeStore,
    getTypeStores,
    deleteTypeStore,
    updateTypeStore
}