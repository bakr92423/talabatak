const express=require("express")
const { addProduct, getProducts, getProduct, updateProduct,deleteProduct } = require("../../Controller/AdminPages/ProductController")
const { ProductValidation } = require("../../Utlies/Validator/Admin/ProductValidation")
const router=express.Router({mergeParams:true})




router.get("/owner/:id",getProducts)

router.route("/")
.post(ProductValidation,addProduct)
.get(getProducts)


router.route("/:id")
.get(getProduct)
.patch(ProductValidation,updateProduct)
.delete(deleteProduct)





module.exports=router