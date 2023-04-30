class Helper {
    constructor() {
        this.message = ""
    }
    isValidAddressInfo = (err) => {
        if ("name" in err.errors) {
            errInstance = err.errors.name.properties
            this.message = errInstance.message
        }
        else if ("pincode" in err.errors) {
            errInstance = err.errors.pincode.properties
        }
        else if ("locality" in err.errors) {
            errInstance = err.errors.pincode.properties
            this.message = errInstance.message
        }
        else if ("address" in err.errors) {
            errInstance = err.errors.pincode.properties
            this.message = errInstance.message
        }
        else if ("city" in err.errors) {
            errInstance = err.errors.pincode.properties
            this.message = errInstance.message
        }
        else if ("state" in err.errors) {
            errInstance = err.errors.pincode.properties
            this.message = errInstance.message
        }
        else if ("userId" in err.errors) {
            errInstance = err.errors.pincode.properties
            this.message = errInstance.message
        }
        return this.message
    }
}


module.exports = new Helper()