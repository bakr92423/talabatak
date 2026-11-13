const {check}=require("express-validator")
const validatorMidellwear=require("../../../Midellweres/ValidatorMidellwere")



exports.addTypeStoreValidation=[
    check("name").notEmpty().withMessage("يجب كتابة نوع المتجر"),
    check("image").notEmpty().withMessage("يجب اختيار صورة نوع المتجر "),

    validatorMidellwear
    
]
exports.updateTypeStoreValidation=[
    check("name").notEmpty().withMessage("يجب كتابة نوع المتجر"),
    check("image").notEmpty().withMessage("يجب اختيار صورة نوع المتجر "),
    validatorMidellwear
    
]