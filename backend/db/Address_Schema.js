const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value || !/^[A-Za-z ]+$/.test(value)) {
                    return false
                }
                return true
            },
            message: 'name only contains characters'
        }
    },
    locality: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return true
            },
            message: "locality can't be empty"
        }
    },
    pincode: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return !isNaN(value) && value.length === 6
            },
            message: "invalid pincode"
        }
    },
    address: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return true
            },
            message: "address can't be empty"
        }
    },
    city: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return true
            },
            message: "city can't be empty"
        }
    },
    state: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false
                }
                return true
            },
            message: "state can't be empty"
        }
    },
    mobile: String,
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
    active: Boolean
})
module.exports = new mongoose.model("address", Schema)  