const express=require("express")
const { addCategory, getCategoryes, getCategory, updateCategory, deleteCategory } = require("../../Controller/AdminPages/CategoryController")
const { addCategoryValidation, updateCategoryValidation } = require("../../Utlies/Validator/Admin/CategoryValidation")
const ProductRoute=require("../../Route/AdminRoute/ProductRoute")
const router=express.Router()


router.use("/:categoryId/product",ProductRoute)
router.get("/owner/:id",getCategoryes)
router.route("/")
.post(addCategoryValidation,addCategory)
.get(getCategoryes)


router.route("/:id")
.get(getCategory)
.patch(updateCategoryValidation,updateCategory)
.delete(deleteCategory)





module.exports=router