const catchAsyncErrror = require("../middlewares/catchAsyncError");
const { ErrorHandler } = require("../middlewares/error");
const {User}=require("../models/user.model")
const cloudinary = require("cloudinary");


const register = catchAsyncErrror(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("User Avatar Required!", 400))
    }
    const { avatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/avif"];

    if (!allowedFormats.includes(avatar.mimetype)) {
        return next(new ErrorHandler("Please Provide Avatar in png,jpg,webp or avif format!", 400))
    }

    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
        return next(new ErrorHandler("Please fill full form!", 400))
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User Already Exists!!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath)
    if (!cloudinaryResponse || cloudinary.console.error) {
        console.error("cloudinary error:",
            cloudinaryResponse.error || "unknown cloudinary error"
        )
    }
    user = await User.create({
        name, email, phone, password,
        avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
    })
    res.status(200).json({
        success: true,
        message: "User Registered Successfully!"
    })
});

const login = catchAsyncErrror((req, res, next) => { });

const logout = catchAsyncErrror((req, res, next) => { });

const myProfile = catchAsyncErrror((req, res, next) => { })


module.exports = { register, login, logout, myProfile }