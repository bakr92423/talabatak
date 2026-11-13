const express = require('express')
const router = express.Router()
const Ad = require('../../Schema/SuperAdminPages/AdsSchema')

// جلب كل الاعلانات - ده اللي السلايدر هيقرأ منه
router.get('/', async (req, res) => {
  const ads = await Ad.find().sort({ createdAt: -1 })
  res.json(ads)
})

// حفظ اعلان جديد - بعد ما ترفع الصورة
router.post('/', async (req, res) => {
  const { image } = req.body
  const ad = await Ad.create({ image })
  res.json(ad)
})

// حذف اعلان
router.delete('/:id', async (req, res) => {
  await Ad.findByIdAndDelete(req.params.id)
  res.json({ message: 'deleted' })
})

module.exports = router