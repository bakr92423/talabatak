const express=require("express")
const { addLocation, getLocations, getLocation, updateLocation, deleteLocation } = require("../../Controller/SuperAdminPages/LocationController")
const { addLocationValidation, updateLocationValidation } = require("../../Utlies/Validator/SuperAdmin/LocationValidation")
const router=express.Router()



router.route("/")
.post(addLocationValidation,addLocation)
.get(getLocations)


router.route("/:id")
.get(getLocation)
.patch(updateLocationValidation,updateLocation)
.delete(deleteLocation)





module.exports=router