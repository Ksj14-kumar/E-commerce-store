const mongoose = require("mongoose")
const { isValidPass } = require("../Services/isValidPass")
const { isValidEmail } = require("../Services/EmailValid")
const Schema = new mongoose.Schema({
    lname: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return true
            },
            message: "provide last name"
        }
    },
    name: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                if (!value || value.length <= 2) {
                    return false
                }
                return true
            },
            message: "provide valid name"
        }
    },
    verify: {
        type: Boolean,
        default: false,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return true
            },
            message: "provide valid password"
        }
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                if (!value || !isValidEmail(value)) {
                    return false
                }
                return true
            },
            message: "provide valid email"
        }
    },
    image: String,
    provider: String
})
module.exports = new mongoose.model("ecommerce_users", Schema)