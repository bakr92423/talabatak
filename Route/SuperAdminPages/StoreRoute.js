const express=require("express")
const { addStore, getStores, getStore, updateStore, deleteStore } = require("../../Controller/SuperAdminPages/StoreController")
const { getProducts } = require("../../Controller/AdminPages/ProductController")
const router=express.Router()



router.route("/")
.post(addStore)
.get(getStores)


router.route("/:id")
.get(getStore)
.patch(updateStore)
.delete(deleteStore)

router.route("/:slug/products")
.get(getProducts)





module.exports=router