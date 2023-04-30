const { default: mongoose } = require("mongoose");
const { isValidEmail } = require("../Services/EmailValid")
const OtpSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return true
            },
            message: "provide userId"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
        validate: {
            validator: function (value) {
                return !isNaN(value)
            },
            message: "invalid created date"
        }
    },
    expireAt: {
        type: Number,
        required: true,
        default: new Date().getTime() + 54000,
        validate: {
            validator: function (value) {
                return !isNaN(value)
            },
            message: "invalid expire date"
        }
    },
    otp: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return true
            },
            message: "invalid OTP, Please enter 4 digits OTP."
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value || !isValidEmail(value)) {
                    return false
                }
                return true
            },
            message: "provide correct email"
        }
    }
})
module.exports = new mongoose.model("otp", OtpSchema)