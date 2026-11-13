const {check}=require("express-validator")
const validatorMidellwear=require("../../../Midellweres/ValidatorMidellwere")



exports.addLocationValidation=[
    check("name").notEmpty().withMessage("يجب كتابة الموقع"),
    check("price").notEmpty().withMessage("يجب كتابة السعر "),

    validatorMidellwear
    
]
exports.updateLocationValidation=[
    check("id").isMongoId().withMessage("يجب اختيار الموقع المراد تعديله"),
    check("name").notEmpty().withMessage("يجب كتابة الموقع"),
    check("price").notEmpty().withMessage("يجب كتابة السعر "),

    validatorMidellwear
    
]
