const { check } = require("express-validator")
const validatorMidellwear = require("../../../Midellweres/ValidatorMidellwere")

exports.ProductValidation = [
  check("name").notEmpty().withMessage("يجب كتابة اسم المنتج"),
  check("image").notEmpty().withMessage("يجب اختيار صورة المنتج"),
  // السعر بقى اختياري لو فيه أحجام، لأن السعر هيجي من الحجم
  check("price").custom((value, { req }) => {
    if (req.body.sizes && req.body.sizes.length > 0) return true
    if (!value) throw new Error("يجب كتابة سعر المنتج")
    return true
  }),
  check("category").isMongoId().notEmpty().withMessage("يجب اختيار القسم"),
  // validation للأحجام الجديدة
  check("sizes").optional().isArray().withMessage("الأحجام لازم تكون قايمة"),
  check("sizes.*.size").optional().notEmpty().withMessage("يجب كتابة اسم الحجم"),
  check("sizes.*.price").optional().isNumeric().withMessage("يجب كتابة سعر الحجم"),

  validatorMidellwear
]
    
