const { User } = require("../models/user.model");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { ErrorHandler } = require("./error");
const jwt = require("jsonwebtoken"); // Correct import

const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("User is not Authenticated", 400));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by the ID from the decoded token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
    }

    next();
});

module.exports = { isAuthenticated };
