const express=require("express")
const { getUser,getUsers, addUser, updateUser, deleteUser } = require("../../Controller/SuperAdminPages/UserController")
const { addUserValidation, updateUserValidation } = require("../../Utlies/Validator/SuperAdmin/UserValidator")
const router=express.Router()



router.route("/")
.post(addUserValidation,addUser)
.get(getUsers)


router.route("/:id")
.get(getUser)
.patch(updateUserValidation,updateUser)
.delete(deleteUser)





module.exports=router