const ORDER=require("../../Schema/AdminPages/OrdersSchema")
const USER=require("../../Schema/SuperAdminPages/UserSchema")
// عدل المسار ده على حسب مكان ملف المنتج عندك
const PRODUCT=require("../../Schema/AdminPages/ProductSchema")

const addOrder=async(req,res)=>{
    try{
        console.log(req.body,"oooo");
        
        const { orderItems, deliveryFee } = req.body

        // هنبني الـ orderItems من جديد بسعر موثوق من الداتابيز
        const fixedItems = []
        let subtotal = 0

        for (const item of orderItems || []) {
            const product = await PRODUCT.findById(item.product)
            if (!product) continue

            const size = item.size || item.variant || null
            let unitPrice = Number(item.price)
            let finalName = product.name

            // لو فيه حجم، هات سعره من variants بتاع المنتج
            if (size && product.variants && product.variants.length > 0) {
                const variant = product.variants.find(v => v.size === size)
                if (variant) {
                    unitPrice = Number(variant.priceAfterDiscount || variant.price)
                    finalName = `${product.name} - ${size}`
                }
            } else {
                // منتج عادي من غير أحجام
                unitPrice = Number(product.priceAfterDiscount || product.price || item.price)
            }

            subtotal += unitPrice * Number(item.quantity)

            fixedItems.push({
                product: product._id,
                quantity: Number(item.quantity),
                price: unitPrice,
                size: size,
                variant: size,
                name: item.name || finalName,
                note: item.note || item.note || ""
            })
        }

        if (fixedItems.length === 0) {
            return res.json({ msg: "السلة فاضية" })
        }

        const newOrder = ORDER({
            ...req.body,
            orderItems: fixedItems,
            totalOrder: subtotal + Number(deliveryFee || 0)
        })
        await newOrder.save()

        res.json({msg:"تم اضافة طلبك",data:newOrder})

    }catch(error){
        console.log(error)
        res.json("خطأ اثناء الاضافة")
    }
}

const getOrders = async (req, res) => {
  try {
    if (req.params.id) {
      const id = req.params.id
      const user = await USER.findById(id)

      if (!user || !user.store) {
        return res.json({ msg: "لا يوجد طلبات", data: [] })
      }

      const storeId = user.store

      // --- فلتر اليوم بس ---
      const startOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)

      const endOfDay = new Date()
      endOfDay.setHours(23, 59, 59, 999)
      // ---------------------

      const orders = await ORDER.find({
        store: storeId,
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      })
        .populate("store")
        .populate("orderItems.product")
        .sort({ createdAt: -1 })

      res.json({ result: orders.length, data: orders })
    } else {

      let {from,to}=req.query
      let startDate;
      let endDate;
      if(from){
        startDate=new Date(from)
        startDate.setHours(0,0,0,0)
      }
      else{
        startDate=new Date()
        startDate.setHours(0,0,0,0)
      }
      if(to){
         endDate=new Date(to)
        endDate.setHours(23,59,59,999)
      }else{
        endDate=new Date()
        endDate.setHours(23,59,59,999)
      }
      const filter={
        createdAt:{$gte:startDate,$lte:endDate}
      }
      // دي بتاعة السوبر أدمن، سيبها زي ما هي بتجيب الكل
      const orders = await ORDER.find(filter)
        .populate("store")
        .populate("orderItems.product")
      res.json({ result: orders.length, data: orders })
    }
  } catch (error) {
    console.log(error)
    res.json("خطأ في جلب البيانات")
  }
}
const getOrder=async(req,res)=>{

 try{
     const id=req.params.id
    const order=await ORDER.findById(id).populate("orderItems.product")
    if(!order){
        return res.json({msg:"الطلب غير موجود"})
    }
    res.json({data:order})

    }catch(error){
        res.json("خطأ اثناء جلب البيانات")
    }
   
}
const updateOrder=async(req,res)=>{

 try{
     const id=req.params.id
    const order=await ORDER.findById(id)
    if(!order){
        return res.json({msg:"الطلب غير موجود"})
    }
    const updatedOrder=await ORDER.findOneAndUpdate({_id:id},{$set:{...req.body}})
    res.json({msg:"تم تحديث طلبك",data:updatedOrder})

    }catch(error){
        res.json("خطأ اثناء تحديث البيانات")
    }
   
}
const deleteOrder=async(req,res)=>{

 try{
     const id=req.params.id
    const order=await ORDER.findById(id)
    if(!order){
        return res.json({msg:"الطلب غير موجود"})
    }
      await ORDER.findByIdAndDelete(id)
    res.json({msg:"تم حذف طلبك"})

    }catch(error){
        res.json("خطأ اثناء حذف البيانات")
    }
   
}

const myOrders=async(req,res)=>{
try{
    const id=req.params.id
    console.log(id,"idd");

    
    const orders= await ORDER.find({user:id})
      res.json({result:orders.length,data:orders})

    }catch(error){
        res.json("خطأ اثناء جلب البيانات")
    }
    
}

const lockOrder = async (req, res) => {
  try {
    const { pilotId } = req.body
    const order = await ORDER.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'الطلب مش موجود' })

    // لو مقفول عند طيار تاني، ارفض
    if (order.lockedBy && order.lockedBy.toString() !== pilotId) {
      return res.status(400).json({ message: 'الأوردر مفتوح عند طيار تاني' })
    }

    order.lockedBy = pilotId
    order.lockedAt = new Date()
    await order.save()
    res.json({ message: 'تم قفل الطلب عليك', data: order })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

// ✅ 2- خروج من الطلب = فك القفل ويرجع للكل
const unlockOrder = async (req, res) => {
  try {
    const { pilotId } = req.body
    const order = await ORDER.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'الطلب مش موجود' })

    // فك القفل بس لو هو نفس الطيار اللي قافله
    if (order.lockedBy && order.lockedBy.toString() === pilotId) {
      order.lockedBy = null
      order.lockedAt = null
      await order.save()
    }
    res.json({ message: 'تم فك القفل', data: order })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

// ✅ 3- استلام الطلب = يروح للمطعم + يثبت الطيار
const acceptOrder = async (req, res) => {
  try {
    const { pilotId } = req.body
    
    const order = await ORDER.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'الطلب مش موجود' })

    order.status = 'accepted'
    order.delivery = pilotId
    order.lockedBy = pilotId
    order.lockedAt = new Date()
    await order.save()
    res.json({ message: 'تم استلام الطلب', data: order })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

// ✅ 4- تغيير الحالة بعد كده
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await ORDER.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json({ message: 'تم تحديث الحالة', data: order })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const getPreviousOrdersForDelivery = async (req, res) => {
  try {
    const pilotId = req.params.id // نفس طريقة myOrders بتاعتك
    const orders = await ORDER.find({ 
      delivery: pilotId,
      status: { $in: ["accepted","delivered", "completed", "done"] } // الطلب اللي اتسلم خلاص
    })
    .populate("store")
    .populate("orderItems.product")
    .sort({ createdAt: -1 })

    res.json({ result: orders.length, data: orders })
  } catch (error) {
    console.log(error)
    res.json("خطأ اثناء جلب الطلبات السابقة")
  }
}

// ولو عايز الطلبات الحالية بتاعة الطيار ده بس - اللي قبلها - ضيف دي كمان:
const getCurrentOrdersForDelivery = async (req, res) => {
  try {
    const pilotId = req.params.id
    const orders = await ORDER.find({ 
      delivery: pilotId,
      status: { $in: ["accepted", "onDelivery", "preparing"] } // لسه مخلصش
    })
    .populate("store")
    .populate("orderItems.product")
    .sort({ createdAt: -1 })

    res.json({ result: orders.length, data: orders })
  } catch (error) {
    console.log(error)
    res.json("خطأ اثناء جلب البيانات")
  }
}

module.exports={
    addOrder,
    getOrder,
    getOrders,
    updateOrder,
    deleteOrder,
    myOrders,
    lockOrder,
    unlockOrder,
    acceptOrder,
    updateOrderStatus,
    getPreviousOrdersForDelivery,
    getCurrentOrdersForDelivery
}
