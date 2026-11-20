const PRODUCT = require("../../Schema/AdminPages/ProductSchema")
const STORE = require("../../Schema/SuperAdminPages/StoreSchema ")
const USER = require("../../Schema/SuperAdminPages/UserSchema")
const slug = require("slugify")

const addProduct = async (req, res) => {
    try {
        const { name, description, image, isActive, price, priceAfterDiscount, quantity, sold, store, category, variants,note } = req.body

        const generateSlug = slug(name, { lower: true, strict: true, locale: "ar" })

        // لو الـ variants جاية كـ string من فورم، نحولها لـ array
        let parsedVariants = []
        if (variants) {
            parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants
        }

        // لو فيه variants، الـ price الأساسي يبقى أقل سعر فيهم عشان الفرونت يعرض "من"
        // لو مفيش، بنكمل بالـ price القديم
        let finalPrice = price
        let finalPriceAfterDiscount = priceAfterDiscount
        if (parsedVariants.length > 0) {
            finalPrice = Math.min(...parsedVariants.map(v => Number(v.price)))
            // لو مش باعت priceAfterDiscount لكل حجم، سيبه فاضي
        }

        const newProduct = PRODUCT({
            name,
            slug: generateSlug,
            description,
            note,
            isActive,
            image,
            price: finalPrice,
            priceAfterDiscount: finalPriceAfterDiscount,
            variants: parsedVariants,
            quantity,
            sold,
            store,
            category
        })
        await newProduct.save()
        res.json({ msg: "تم اضافة العنصر", data: newProduct })

    } catch (error) {
        console.log("خطأ في الاضافة", error);
        res.json({ msg: "خطأ في الاضافة" })
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await PRODUCT.findById(id).populate("category")
        if (!product) {
            return res.json({ msg: " الصنف غير موجود" })
        }
        res.json({ data: product })
    } catch (error) {
        res.json({ msg: "خطأ في جلب  الصنف" })
    }
}

const getProducts = async (req, res) => {
    try {
        const storeSlug = req.params.slug
        let mongooseQuery = PRODUCT.find()
        console.log("jjjj");

        if (req.params.id || req.query.owner) {
            const id = req.params.id || req.query.owner
            const user = await USER.findById(id)
            if (!user || !user.store) {
                return res.json({ msg: "لا يوجد طلبات", data: [] })
            }
            const storeId = user.store
            console.log(storeId, "storeId");
            mongooseQuery = mongooseQuery.find({ store: storeId })
        }
        else if (storeSlug) {
            const store = await STORE.findOne({ slug: storeSlug })
            if (store) {
                mongooseQuery = mongooseQuery.find({ store: store._id })
            } else {
                return res.json({ data: [] })
            }
        }

        if (req.query.keyword) {
            const query = {}
            query.$or = [
                { name: { $regex: `${req.query.keyword}`, $options: "i" } },
                { description: { $regex: `${req.query.keyword}`, $options: "i" } },
            ]
            mongooseQuery = mongooseQuery.find(query)
        }

        if (req.params.categoryId) {
            mongooseQuery = mongooseQuery.find({ category: req.params.categoryId })
        }

        const products = await mongooseQuery.populate("category")
        res.json({ result: products.length, data: products })
    } catch (error) {
        res.json({ msg: "خطأ في جلب الصنف" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, description, isActive, image, price, priceAfterDiscount, quantity, sold, store,note, category, variants } = req.body
        const generateSlug = slug(name, { lower: true, strict: true, locale: "ar" })
        const id = req.params.id
        const product = await PRODUCT.findById(id)

        if (!product) {
            return res.json({ msg: " الصنف غير موجود" })
        }

        let parsedVariants = product.variants
        if (variants !== undefined) {
            parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants
        }

        let finalPrice = price
        let finalPriceAfterDiscount = priceAfterDiscount
        // لو بعت variants جديدة، حدث الـ price لأقل سعر
        if (parsedVariants && parsedVariants.length > 0) {
            finalPrice = Math.min(...parsedVariants.map(v => Number(v.price)))
        }

        const data = { name, slug: generateSlug, description, isActive, image, price: finalPrice, priceAfterDiscount: finalPriceAfterDiscount, variants: parsedVariants, quantity, sold, store, category }
        const updatedProduct = await PRODUCT.findOneAndUpdate({ _id: id }, data, { new: true })

        res.json({ msg: "تم تحديث  الصتف", data: updatedProduct })
    } catch (error) {
        console.log(error)
        res.json({ msg: "خطأ في تحديث  الصنف" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await PRODUCT.findById(id)
        if (!product) {
            return res.json({ msg: " الصنف غير موجود" })
        }
        await PRODUCT.findByIdAndDelete(id)
        res.json({ msg: "تم حذف  الصنف" })
    } catch (error) {
        res.json({ msg: "خطأ في حذف  الصنف" })
    }
}

module.exports = {
    addProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct
}