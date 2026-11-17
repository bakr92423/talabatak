const { check } = require("express-validator")
const validatorMidellwear = require("../../../Midellweres/ValidatorMidellwere")

exports.ProductValidation = [
  check("name").notEmpty().withMessage("يجب كتابة اسم المنتج"),
  check("image").notEmpty().withMessage("يجب اختيار صورة المنتج"),

  // السعر مش إجباري لو فيه variants أو sizes
  check("price").custom((value, { req }) => {
    const hasVariants = (req.body.variants && req.body.variants.length > 0)
    const hasSizes = (req.body.sizes && req.body.sizes.length > 0)
    if (hasVariants || hasSizes) return true
    if (!value) throw new Error("يجب كتابة سعر المنتج")
    return true
  }),

  check("category").isMongoId().notEmpty().withMessage("يجب اختيار القسم"),

  // validation للـ variants اللي الفرونت بيبعتها فعلاً
  check("variants").optional().isArray(),
  check("variants.*.size").optional().notEmpty().withMessage("يجب كتابة اسم الحجم"),
  check("variants.*.price").optional().isNumeric().withMessage("يجب كتابة سعر الحجم"),

  // ودي احتياطي لو غيرت الاسم لـ sizes بعد كده
  check("sizes").optional().isArray(),
  check("sizes.*.size").optional().notEmpty(),
  check("sizes.*.price").optional().isNumeric(),

  validatorMidellwear
]

    
