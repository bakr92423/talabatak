const express=require("express")
const { addUser, getUser, getUsers, updateUser, deleteUser } = require("../../Controller/AdminPages/RegisterController")
const { registerValidation } = require("../../Utlies/Validator/Admin/RegisterValidator")
const router=express.Router()



router.route("/")
.post(registerValidation,addUser)
.get(getUser)


router.route("/:id")
.get(getUsers)
.patch(registerValidation,updateUser)
.delete(deleteUser)





module.exports=router