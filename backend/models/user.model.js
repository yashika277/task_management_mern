let mongoose = require("mongoose")
let validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide your Name"],
        minLength: [3, "Name must contains at least 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
        unique: [true, "User Alredy registered"],
        validate: [validator.isEmail, "Please Provide valid Email!"],
    },
    phone: {
        type: Number,
        required: [true, "please provide your Phone Number"],
    },
    password: {
        type: String,
        required: [true, "Please Provide your Password"],
        minLength: [8, "password must contains at least 8 characters"],
        maxLength: [32, "password cannot exceed 32 characters"],
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

let User = mongoose.model("userSchema", userSchema);

module.exports = User;