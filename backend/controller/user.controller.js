const catchAsyncError = require("../middlewares/catchAsyncError");
const { ErrorHandler } = require("../middlewares/error");
const { User } = require("../models/user.model");
const { sendToken } = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;


const register = catchAsyncError(async (req, res, next) => {
    // Check if avatar file is uploaded
    if (!req.files || !req.files.avatar) {
        return next(new ErrorHandler("User Avatar Required!", 400));
    }

    const { avatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/avif"];

    // Check if avatar format is allowed
    if (!allowedFormats.includes(avatar.mimetype)) {
        return next(new ErrorHandler("Please provide an avatar in png, jpg, webp, or avif format!", 400));
    }

    const { name, email, phone, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone || !password) {
        return next(new ErrorHandler("Please fill out the entire form!", 400));
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exists!", 400));
    }

    // Upload avatar to Cloudinary
    let cloudinaryResponse;
    try {
        cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });
    } catch (error) {
        return next(new ErrorHandler("Cloudinary upload failed, please try again.", 500));
    }


    // Create new user in the database
    user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
    });

    sendToken("User Registerd ", user, res, 200);

});

const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Provide email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password!", 400))

    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password!", 400))

    }
    sendToken("User Logged In!", user, res, 200);

});

const logout = catchAsyncError((req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "User Logged Out!"
    })
});

const myProfile = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    })
});

module.exports = { register, login, logout, myProfile };
