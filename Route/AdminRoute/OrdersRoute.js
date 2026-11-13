const express=require("express")
const { addOrder, getOrders, getOrder, updateOrder, deleteOrder, myOrders, lockOrder, unlockOrder, acceptOrder, updateOrderStatus, getPreviousOrdersForDelivery, getCurrentOrdersForDelivery } = require("../../Controller/AdminPages/OrdersControllers")
const { orderValidation } = require("../../Utlies/Validator/Admin/OrderValidition")
const router=express.Router()



router.route("/myOrder/:id")
.get(myOrders)

router.route("/:id/lock")
.patch(lockOrder)
router.route("/:id/unlock")
.patch(unlockOrder)
router.route("/:id/accept")
.patch(acceptOrder)
router.route("/:id/status")
.patch(updateOrderStatus)

router.get("/delivery/previous/:id", getPreviousOrdersForDelivery)
router.get("/delivery/current/:id", getCurrentOrdersForDelivery)
router.get("/owner/:id",getOrders)

router.route("/")
.post(addOrder)
.get(getOrders)


router.route("/:id")
.get(getOrder)
.patch(orderValidation,updateOrder)
.delete(deleteOrder)


module.exports=router