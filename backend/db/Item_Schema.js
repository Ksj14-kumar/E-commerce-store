const { default: mongoose } = require("mongoose");
const ItemSchema = new mongoose.Schema({
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
    items: [Object],
    totalItems: Number,
    totalAmount: Number
})
module.exports = new mongoose.model("items", ItemSchema)