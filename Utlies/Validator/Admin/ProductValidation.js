const {check}=require("express-validator")
const validatorMidellwear=require("../../../Midellweres/ValidatorMidellwere")



exports.ProductValidation=[
    check("name").notEmpty().withMessage("يجب كتابة اسم الصنف"),
    check("image").notEmpty().withMessage("يجب اختيار صورة الصنف"),
    check("price").notEmpty().withMessage("يجب كتابة سعر الصنف"),
    check("category").isMongoId().notEmpty().withMessage("يجب اختيار القسم"),
    


    validatorMidellwear
    
]