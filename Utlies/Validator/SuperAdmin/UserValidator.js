const {check}=require("express-validator")
const validatorMidellwear=require("../../../Midellweres/ValidatorMidellwere")



exports.addUserValidation=[
    check("name").notEmpty().withMessage("يجب كتابة اسم المستخدم ثلاثي"),
    check("userID").notEmpty().withMessage("يجب كتابة كود المستخدم "),
    check("role").notEmpty().withMessage("يجب اختيار صلاحية المستخدم "),
    check("password").notEmpty().withMessage("يجب كتابة كلمة المرور "),
    validatorMidellwear
    
]
exports.updateUserValidation=[
    check("name").notEmpty().withMessage("يجب كتابة اسم المستخدم ثلاثي"),
    check("userID").notEmpty().withMessage("يجب كتابة كود المستخدم "),
    check("role").notEmpty().withMessage("يجب اختيار صلاحية المستخدم "),
    check("password").notEmpty().withMessage("يجب كتابة كلمة المرور "),
    validatorMidellwear
    
]