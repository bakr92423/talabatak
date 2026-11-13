const Location=require("../../Schema/SuperAdminPages/LocationSchema ")






const addLocation=async(req,res)=>{

    const newLocation= Location(req.body)
    await newLocation.save()
    res.json({msg:"تم اضافة الموقع",data:newLocation})
}

const getLocation=async(req,res)=>{

 try{
       const id=req.params.id
    const location= await Location.findById(id)

    if(!location){
        return res.json({msg:" الموقع غير موجود"})
    }

     res.json({data:location})

 }catch(error){
    res.json({msg:"خطأ في جلب  الموقع"})

 }

}
const getLocations=async(req,res)=>{

 try{
    const location= await Location.find()

     res.json({result:location.length,data:location})

 }catch(error){
    res.json({msg:"خطأ في جلب  الموقع"})

 }

}

const updateLocation=async(req,res)=>{

 try{
       const id=req.params.id
    const location= await Location.findById(id)

    if(!location){
        return res.json({msg:" الموقع غير موجود"})
    }
    const updatedLocation= await Location.findOneAndUpdate({_id:id},{$set:{...req.body}})

     res.json({msg:"تم تحديث  الموقع",data:updatedLocation})

 }catch(error){
    res.json({msg:"خطأ في تحديث  الموقع"})

 }

}
const deleteLocation=async(req,res)=>{

 try{
    const id=req.params.id
    const location= await Location.findById(id)

    if(!location){
        return res.json({msg:"الموقع غير موجود"})
    }
     await Location.findByIdAndDelete(id)

     res.json({msg:"تم حذف الموقع"})

 }catch(error){
    res.json({msg:"خطأ في حذف  الموقع"})

 }

}





module.exports={
    addLocation,
    getLocation,
    getLocations,
    deleteLocation,
    updateLocation
}