const Address = require("../db/Address_Schema")
const { isValidNum } = require("../Services/NumberValid")
const { isValidAddressInfo } = require("./Controller/Address_Controller.helper")
class Socket {
    async AddAddress(params, socket) {
        let message = {}
        try {
            const { name, pincode, locality, address, city, state, mobile, userId } = params
            if (!name || !pincode || !locality || !address || !city || !state || !mobile || !userId) {
                message.msg = "something missing"
                message.status = 404
            }
            if (pincode.length !== 6) {
                message.msg = "pincode is wrong"
                message.status = 404
            }
            if (!isValidNum(mobile)) {
                message.msg = "Invalid mobile number"
                message.status = 404
            }
            else {
                await Address.updateMany({ userId: userId }, { $set: { active: false } }, { multi: true }).exec()
                const newAddress = await Address({
                    name,
                    locality,
                    address,
                    city,
                    state,
                    mobile,
                    pincode,
                    userId,
                    active: true
                })
                newAddress.save(async (err) => {
                    if (err) {
                        console.log(`~ file: socket.methods.js:36 ~ Socket ~ newAddress.save ~ err:${err}`)
                        const returnValue = isValidAddressInfo(err)
                        message.msg = returnValue
                        message.status = 404
                    }
                    else {
                        const allAddress = await Address.find({ userId: userId }).exec()
                        console.log({ allAddress })
                        message.msg = allAddress
                        message.status = 200
                    }
                    socket.emit("message", message)
                })
            }
        } catch (err) {
            console.log(err)
            socket.emit("message", { msg: "something error occured", status: 500 })
        }
    }
}
module.exports = new Socket()