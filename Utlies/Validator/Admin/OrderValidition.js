const {check}=require("express-validator")
const validatorMidellwear=require("../../../Midellweres/ValidatorMidellwere")



exports.orderValidation=[
    check("address").notEmpty().withMessage("يجب كتابة العنوان الخاص بك"),
    check("phone").notEmpty().withMessage("يجب كتابة رقم الهاتف"),
    check("price").notEmpty().withMessage("يجب كتابة سعر الصنف"),
    check("location").isMongoId().notEmpty().withMessage("يجب اختيار موقعك"),

    validatorMidellwear
    
]