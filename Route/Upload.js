const express = require("express");
const router = express.Router();
const multer = require("multer") 
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require('dotenv').config()

// ✅ إعداد Cloudinary - من غير أي رفع تجريبي
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ إعداد Multer مع Cloudinary
// مهم: مفيش transformation هنا عشان منستهلكش كوتة الفري
// الصورة بتتضغط في الفرونت قبل الرفع، والتحويل بيحصل في العرض بس w_800
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png"],
    // خلي الصيغة jpg عشان حجمها أصغر
    format: "jpg",
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB كفاية جداً، لأن الصورة بتوصل مضغوطة 200KB
});

// ✅ نقطة النهاية لرفع الصور
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ يرجى اختيار صورة!" });
    }

    const imageUrl = req.file.path || req.file.secure_url;

    res.status(201).json({
      message: "🎉 تم رفع الصورة بنجاح!",
      imageUrl,
    });
  } catch (error) {
    console.error("❌ خطأ أثناء رفع الصورة:", error);

    // لو الصورة أكبر من 2MB
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: "الصورة كبيرة، اختر صورة أصغر" });
    }

    res.status(500).json({ 
      message: "🚨 خطأ داخلي في السيرفر!",
      error: error.message || JSON.stringify(error, null, 2) 
    });
  }
});

module.exports = router;