const {check}=require("express-validator")
const validatorMidellwear=require("../../../Midellweres/ValidatorMidellwere")



exports.registerValidation=[
    check("name").notEmpty().withMessage("يجب كتابة اسم المستخدم ثلاثي"),
    check("phone").notEmpty().withMessage("يجب كتابة رقم الهاتف "),
    validatorMidellwear
    
]
