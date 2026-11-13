const {check}=require("express-validator")
const validatorMidellwear=require("../../../Midellweres/ValidatorMidellwere")



exports.addCategoryValidation=[
    check("name").notEmpty().withMessage("يجب كتابة  القسم"),
    // check("store").isMongoId().notEmpty().withMessage("يجب كتابة  المتجر"),


    validatorMidellwear
    
]
exports.updateCategoryValidation=[
    check("name").notEmpty().withMessage("يجب كتابة القسم"),

    validatorMidellwear
    
]