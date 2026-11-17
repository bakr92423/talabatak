const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },
    image: {
        type: String // صورة واحدة للمنتج كله
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    priceAfterDiscount: {
        type: Number
    },
    // الأحجام - اسم وسعر بس
    variants: [
        {
            size: {
                type: String // وسط - كبير
            },
            price: {
                type: Number
            },
            priceAfterDiscount: {
                type: Number
            },
            quantity: {
                type: Number,
                default: 0
            },
            isActive: {
                type: Boolean,
                default: true
            }
        }
    ],
    quantity: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sold: {
        type: Number
    },
    store: {
        type: mongoose.Schema.ObjectId,
        ref: "store"
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "category"
    },
}, { timestamps: true })

module.exports = mongoose.model("product", productSchema)