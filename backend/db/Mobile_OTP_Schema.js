const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return true
            },
            message: "mobile can't be empty"
        }
    },
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
            message: "userId can't be empty"
        }
    },
    otp: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                if (!value || !/^\d{4}$/.test(value)) {
                    return false
                }
                return true
            },
            message: "invalid OTP, Please enter 4 digits OTP."
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
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
                if (!value) {
                    return false
                }
                return !isNaN(value)
            },
            message: "invalid expire date"
        }
    },
    verify: Boolean
})
module.exports = new mongoose.model("mobile_verify", Schema)