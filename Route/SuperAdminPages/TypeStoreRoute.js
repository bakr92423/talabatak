const express=require("express")
const { addTypeStore, getTypeStores, getTypeStore, updateTypeStore, deleteTypeStore } = require("../../Controller/SuperAdminPages/TypeStoreController")
const { addTypeStoreValidation, updateTypeStoreValidation } = require("../../Utlies/Validator/SuperAdmin/TypeStoreValidation")
const router=express.Router()



router.route("/")
.post(addTypeStoreValidation,addTypeStore)
.get(getTypeStores)


router.route("/:id")
.get(getTypeStore)
.patch(updateTypeStoreValidation,updateTypeStore)
.delete(deleteTypeStore)





module.exports=router