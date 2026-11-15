const STORE=require("../../Schema/SuperAdminPages/StoreSchema ")
const TypeStoreSchema=require("../../Schema/SuperAdminPages/TypeStoreSchema")
const slug=require("slugify")





const addStore=async(req,res)=>{
    console.log(req.body);
    const {name,description,image,typeStore,area,address,phone,isOpen,isActive,ratingsQuantity,minOrder,estimatedDeliveryTime,openingTime,closingTime}=req.body
    
    const generateSlug=slug(String(name),{lower:true,strict:true,locale:"ar"})
    const newStore= STORE({name,slug:generateSlug,description,typeStore,area,address,phone,isOpen,isActive,ratingsQuantity,minOrder,estimatedDeliveryTime,image})
    await newStore.save()
    res.json({msg:"تم اضافة نوع المتجر",data:newStore})
}


const getStore=async(req,res)=>{

 try{
       const id=req.params.id
    const store= await STORE.findById(id)

    if(!store){
        return res.json({msg:" المتجر غير موجود"})
    }

     res.json({data:store})

 }catch(error){
    res.json({msg:"خطأ في جلب  المتجر"})

 }

}
const getStores = async (req, res) => {
  try {
    const query = req.query
    let limit = parseInt(query.limit) || 20
    let page = parseInt(query.page) || 1
    let skip = (page - 1) * limit

    const isStoreOpenNow = (store) => {
      if (!store.openingTime || !store.closingTime) return true
      const toMinutes = (time) => {
        const [h, m] = time.split(':').map(Number)
        return h * 60 + (m || 0)
      }
      const nowCairo=new Date().toLocaleString("en-US",{timeZone:`Africa/Cairo`})
      const now = new Date(nowCairo)
      const nowMinutes = now.getHours() * 60 + now.getMinutes()
      const open = toMinutes(store.openingTime)
      const close = toMinutes(store.closingTime)
      console.log(store.name,"now",nowMinutes,"open",open,"close",close);
      
      if (close < open) {
        return nowMinutes >= open || nowMinutes <= close
      }
      return nowMinutes >= open && nowMinutes <= close
    }

    const filter = {}
    if (query.showAll !== 'true') {
      filter.isActive = true
      filter.isOpen = true
    }

    if (query.keyword) {
      filter.name = { $regex: query.keyword, $options: 'i' }
    }

    if (query.typeStore) {
      filter.typeStore = query.typeStore
    }

    const stores = await STORE.find(filter).limit(limit).skip(skip)

    let finalStores = stores
    if (query.showAll !== 'true') {
      finalStores = stores.filter(isStoreOpenNow)
    }

    res.json({ result: finalStores.length, data: finalStores })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "خطأ في جلب المتجر" })
  }
}


const updateStore = async (req, res) => {
  try {
    const id = req.params.id
    const store = await STORE.findById(id)

    if (!store) {
      return res.status(404).json({ msg: "المتجر غير موجود" })
    }

    const data = {
      ...req.body
    }

    // اتصلح - كان slug(name) و name مش موجود
    if (req.body.name) {
      data.slug = slug(req.body.name, { lower: true, strict: true, locale: "ar" })
    }

    // مهم: متبعتش _id و __v في التحديث عشان مونجو ميضربش
    delete data._id
    delete data.__v

    const updatedStore = await STORE.findOneAndUpdate(
      { _id: id },
      data,
      { new: true, runValidators: true }
    )

    res.json({ msg: "تم تحديث المتجر", data: updatedStore })

  } catch (error) {
    console.log("UPDATE STORE ERROR:", error) // عشان تشوف الخطأ الحقيقي بعد كده
    res.status(500).json({ msg: "خطأ في تحديث المتجر", error: error.message })
  }
}

const deleteStore=async(req,res)=>{

 try{
       const id=req.params.id
    const store= await STORE.findById(id)

    if(!store){
        return res.json({msg:" المتجر غير موجود"})
    }
     await STORE.findByIdAndDelete(id)

     res.json({msg:"تم حذف  المتجر"})

 }catch(error){
    res.json({msg:"خطأ في حذف  المتجر"})

 }

}





module.exports={
    addStore,
    getStore,
    getStores,
    deleteStore,
    updateStore
}